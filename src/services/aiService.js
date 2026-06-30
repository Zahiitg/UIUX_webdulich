/**
 * AI Service - Tích hợp Google Gemini API
 * 
 * Service chính để gọi AI sinh lịch trình và chat.
 * Sử dụng Google Gemini API (Generative AI).
 */

// ============ CẤU HÌNH ============
// Thay API key thật vào đây
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent';

import placesData from '../data/placesData';

// ============ TÍNH TOÁN KHOẢNG CÁCH (HAVERSINE) ============
function calculateDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c;
}

function enrichItineraryWithRealTravelTime(itinerary) {
  if (!itinerary || !itinerary.days) return itinerary;
  
  itinerary.days.forEach(day => {
    if (!day.activities) return;
    
    for (let i = 0; i < day.activities.length; i++) {
      const currentAct = day.activities[i];
      if (i === day.activities.length - 1) {
        currentAct.travelTimeToNext = 'Về khách sạn (Khoảng 20 phút)';
        continue;
      }
      
      const nextAct = day.activities[i + 1];
      const p1 = placesData.find(p => p.id === currentAct.placeId);
      const p2 = placesData.find(p => p.id === nextAct.placeId);
      
      if (p1 && p2 && p1.lat && p2.lat) {
        const distKm = calculateDistance(p1.lat, p1.lng, p2.lat, p2.lng);
        let minutes = Math.round(distKm * 1.5) + 10; // 40km/h + 10p đỗ xe
        
        let timeStr = '';
        if (distKm <= 1) {
          timeStr = `Đi bộ khoảng 5-10 phút (${distKm.toFixed(1)} km)`;
        } else if (minutes < 60) {
          timeStr = `Khoảng ${minutes} phút (${distKm.toFixed(1)} km)`;
        } else {
          const hours = Math.floor(minutes / 60);
          const remain = minutes % 60;
          timeStr = `Khoảng ${hours} giờ ${remain} phút (${distKm.toFixed(1)} km)`;
        }
        currentAct.travelTimeToNext = timeStr;
      }
    }
  });
  return itinerary;
}

// ============ SYSTEM PROMPTS ============

const ITINERARY_SYSTEM_PROMPT = `Bạn là một chuyên gia du lịch Gia Lai (Việt Nam) với kiến thức sâu rộng về tất cả địa điểm, ẩm thực, văn hóa và phong tục tập quán ở Gia Lai và vùng Tây Nguyên.

NHIỆM VỤ: Tạo lịch trình du lịch tối ưu cho khách dựa trên sở thích, thời gian và ngân sách.

QUY TẮC:
1. Ưu tiên sử dụng các địa điểm có trong danh sách được cung cấp. Nếu thiếu, có thể thêm các hoạt động chung chung như "Tự do nghỉ ngơi", "Thưởng thức cà phê địa phương", "Mua sắm đặc sản".
2. Sắp xếp lịch trình hợp lý theo vị trí địa lý (gần nhau trước)
3. Phân bổ đều địa điểm. Nếu đi ít ngày, mỗi ngày 3-5 hoạt động. Nếu đi nhiều ngày (>4 ngày), dãn cách lịch trình ra (1-2 hoạt động/ngày) để nghỉ ngơi.
4. Tính toán thời gian di chuyển giữa các điểm
5. Đảm bảo tổng chi phí không vượt ngân sách
6. Ưu tiên các địa điểm phù hợp với sở thích của khách

FORMAT TRẢ VỀ (JSON NGHIÊM NGẶT):
{
  "days": [
    {
      "dayNumber": 1,
      "title": "Ngày 1: Khám phá trung tâm Pleiku",
      "activities": [
        {
          "placeId": 1,
          "name": "Tên địa điểm",
          "timeSlot": "07:00 - 09:00",
          "duration": "2 giờ",
          "note": "Gợi ý ngắn cho du khách",
          "estimatedCost": 0,
          "travelTimeToNext": "15 phút"
        }
      ]
    }
  ],
  "totalEstimatedCost": 500000,
  "matchPercentage": 85,
  "tips": ["Gợi ý 1", "Gợi ý 2"]
}

CHỈ TRẢ VỀ JSON, KHÔNG CÓ TEXT BỔ SUNG.`;

const CHATBOT_SYSTEM_PROMPT = `Bạn là một trợ lý du lịch AI thông minh, thân thiện, chuyên về Gia Lai (Tây Nguyên, Việt Nam). 
Tên bạn là "GiaLai Guide" 🌿

PHONG CÁCH:
- Nói chuyện tự nhiên, thân thiện như một hướng dẫn viên bản địa
- Sử dụng emoji phù hợp nhưng vừa phải
- Trả lời bằng tiếng Việt
- Câu trả lời ngắn gọn, súc tích (dưới 200 từ)

KHẢ NĂNG:
1. Gợi ý thêm/xóa/thay đổi địa điểm trong lịch trình
2. Trả lời câu hỏi về ẩm thực Gia Lai (phở khô, cà phê muối, cơm lam...)
3. Gợi ý món ăn theo bữa
4. Cung cấp thông tin di chuyển, thời tiết
5. Tư vấn mẹo du lịch Gia Lai

KHI NGƯỜI DÙNG YÊU CẦU THAY ĐỔI LỊCH TRÌNH:
- Phân tích yêu cầu
- Đề xuất thay đổi cụ thể
- Nếu cần trả về JSON lịch trình mới, đặt trong block \`\`\`json ... \`\`\`

CONTEXT SẼ ĐƯỢC CUNG CẤP:
- Lịch trình hiện tại của du khách
- Sở thích đã chọn
- Thông tin chuyến đi (ngày, số người, ngân sách)`;


// ============ API FUNCTIONS ============

/**
 * Gọi Gemini API
 */
async function callGeminiAPI(prompt, systemPrompt) {
  console.log('Sending request to Gemini API. Key length:', GEMINI_API_KEY.length, 'Key starts with:', GEMINI_API_KEY.substring(0, 5));

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 4096,
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

/**
 * Sinh lịch trình từ AI
 */
export async function generateItinerary(preferences, tripInfo) {
  const placesContext = JSON.stringify(placesData.map(p => ({
    id: p.id,
    name: p.name,
    category: p.category,
    rating: p.rating,
    price: p.price,
    priceNote: p.priceNote,
    duration: p.duration,
    lat: p.lat,
    lng: p.lng,
    shortDescription: p.shortDescription,
  })));

  const prompt = `
DANH SÁCH ĐỊA ĐIỂM GIA LAI:
${placesContext}

THÔNG TIN DU KHÁCH:
- Sở thích: ${preferences.join(', ')}
- Ngày đi: ${tripInfo.startDate}
- Ngày về: ${tripInfo.endDate}
- Số người: ${tripInfo.numPeople}
- Ngân sách: ${tripInfo.budget.toLocaleString('vi-VN')}đ (tổng cho cả nhóm)
- Điểm đến: ${tripInfo.destination}

Hãy tạo lịch trình du lịch tối ưu. Trả về JSON theo format đã quy định.`;

  try {
    const response = await callGeminiAPI(prompt, ITINERARY_SYSTEM_PROMPT);
    // Extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      let rawItinerary = JSON.parse(jsonMatch[0]);
      return enrichItineraryWithRealTravelTime(rawItinerary);
    }
    throw new Error('Không thể parse JSON từ AI response');
  } catch (error) {
    console.error('Error generating itinerary:', error);
    // Fallback: generate local itinerary
    return enrichItineraryWithRealTravelTime(generateFallbackItinerary(preferences, tripInfo));
  }
}

/**
 * Chat với AI
 */
export async function chatWithAI(messages, itinerary, preferences, tripInfo) {
  const context = `
LỊCH TRÌNH HIỆN TẠI:
${JSON.stringify(itinerary, null, 2)}

SỞ THÍCH DU KHÁCH: ${preferences.join(', ')}
THÔNG TIN: ${tripInfo.numPeople} người, ngân sách ${tripInfo.budget.toLocaleString('vi-VN')}đ
NGÀY: ${tripInfo.startDate} → ${tripInfo.endDate}

DANH SÁCH ĐỊA ĐIỂM CÓ SẴN:
${JSON.stringify(placesData.map(p => ({ id: p.id, name: p.name, category: p.category })))}
`;

  const conversationHistory = messages.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));

  // Build full messages including context
  const fullPrompt = `${context}\n\nLỊCH SỬ HỘI THOẠI:\n${messages.map(m => `${m.role}: ${m.content}`).join('\n')}\n\nHãy trả lời tin nhắn mới nhất của du khách.`;

  try {
    const response = await callGeminiAPI(fullPrompt, CHATBOT_SYSTEM_PROMPT);
    
    // Xóa đoạn JSON rườm rà ra khỏi tin nhắn để hiển thị UI sạch đẹp
    const cleanContent = response.replace(/```json\s*[\s\S]*?\s*```/g, '').trim();

    let updatedItinerary = extractItineraryFromResponse(response);
    if (updatedItinerary) {
      updatedItinerary = enrichItineraryWithRealTravelTime(updatedItinerary);
    }

    return {
      content: cleanContent,
      hasItineraryUpdate: response.includes('```json'),
      updatedItinerary: updatedItinerary,
    };
  } catch (error) {
    console.error('Chat API error:', error);
    return {
      content: 'Xin lỗi, tôi đang gặp sự cố kết nối. Bạn có thể thử lại sau nhé! 🙏',
      hasItineraryUpdate: false,
      updatedItinerary: null,
    };
  }
}

/**
 * Extract JSON lịch trình từ response của chatbot (nếu có)
 */
function extractItineraryFromResponse(response) {
  const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[1]);
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Fallback: Sinh lịch trình cục bộ khi API lỗi
 */
function generateFallbackItinerary(preferences, tripInfo) {
  const prefMap = {
    'thien-nhien': 'Thiên nhiên',
    'am-thuc': 'Ẩm thực',
    'check-in': 'Check-in',
    'van-hoa': 'Văn hóa',
    'trekking': 'Trekking',
    'cam-trai': 'Cắm trại',
    'nghi-duong': 'Nghỉ dưỡng',
    'ca-phe': 'Cà phê',
    'gia-dinh': 'Gia đình có trẻ em',
  };

  const preferenceLabels = preferences.map(p => prefMap[p] || p);
  
  // Filter and sort places by preference match
  const scoredPlaces = placesData.map(place => {
    const matchCount = place.category.filter(cat => 
      preferenceLabels.includes(cat)
    ).length;
    return { ...place, matchScore: matchCount };
  }).sort((a, b) => b.matchScore - a.matchScore || b.rating - a.rating);

  // Calculate number of days
  const start = new Date(tripInfo.startDate);
  const end = new Date(tripInfo.endDate);
  const numDays = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));

  const days = [];
  let placeIndex = 0;
  let totalCost = 0;

  for (let d = 0; d < numDays; d++) {
    const dayActivities = [];
    const timeSlots = ['07:00 - 09:00', '10:00 - 12:00', '14:00 - 16:00', '17:00 - 19:00'];
    
    // Nếu ngày đi quá dài, mỗi ngày chỉ phân bổ 1-2 địa điểm để không bị hết sớm
    const actualPlacesPerDay = Math.max(1, Math.min(4, Math.floor(scoredPlaces.length / numDays)));
    
    let activitiesCount = 0;
    while (activitiesCount < actualPlacesPerDay && placeIndex < scoredPlaces.length) {
      const place = scoredPlaces[placeIndex];
      const cost = place.price * tripInfo.numPeople;
      totalCost += cost;
      
      dayActivities.push({
        placeId: place.id,
        name: place.name,
        timeSlot: timeSlots[activitiesCount] || '19:00 - 21:00',
        duration: place.duration,
        note: place.shortDescription,
        estimatedCost: cost,
        travelTimeToNext: '15-30 phút',
      });
      placeIndex++;
      activitiesCount++;
    }

    // Nếu hết địa điểm, thêm hoạt động tự do
    if (dayActivities.length === 0) {
      dayActivities.push({
        placeId: 999, // Fake ID
        name: 'Tự do khám phá & Mua sắm',
        timeSlot: '08:00 - 11:30',
        duration: 'Nửa ngày',
        note: 'Dành thời gian nghỉ ngơi, thưởng thức cà phê Pleiku hoặc mua sắm đặc sản.',
        estimatedCost: 150000 * tripInfo.numPeople,
        travelTimeToNext: 'Không',
      });
      totalCost += 150000 * tripInfo.numPeople;
    }

    days.push({
      dayNumber: d + 1,
      title: `Ngày ${d + 1}: ${d === 0 ? 'Khám phá Pleiku' : d === 1 ? 'Thiên nhiên & Văn hóa' : 'Trải nghiệm tự do'}`,
      activities: dayActivities,
    });
  }

  const matchedCount = scoredPlaces.filter(p => p.matchScore > 0).length;
  const matchPercentage = Math.round((matchedCount / scoredPlaces.length) * 100);

  return {
    days,
    totalEstimatedCost: totalCost,
    matchPercentage: Math.min(95, Math.max(60, matchPercentage)),
    tips: [
      'Nên đi sớm buổi sáng để tránh nắng và có ảnh đẹp',
      'Mang theo áo ấm vì Pleiku se lạnh buổi tối',
      'Thử cà phê muối - đặc sản không thể bỏ qua!',
    ],
  };
}

export default {
  generateItinerary,
  chatWithAI,
};
