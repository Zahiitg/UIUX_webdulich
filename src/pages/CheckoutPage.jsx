import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toursData from '../data/toursData';
import useTravelStore from '../store/useTravelStore';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';
import { useTranslation } from 'react-i18next';

export default function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addBooking = useTravelStore(state => state.addBooking);
  const user = useTravelStore(state => state.user);
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'vi';

  const tour = toursData.find(t => t.id === Number(id));

  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    phone: '',
    email: user?.email || '',
    date: '',
    adults: 1,
    children: 0,
    services: {
      insurance: false,
      pickup: false,
    },
    paymentMethod: 'vnpay',
    promoCode: ''
  });

  const [promoApplied, setPromoApplied] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const validatePhone = (value) => {
    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (!value) {
      setPhoneError(t('checkout.phoneRequired'));
      return false;
    } else if (!phoneRegex.test(value)) {
      setPhoneError(t('checkout.phoneInvalid'));
      return false;
    } else if (value.replace(/[^0-9]/g, '').length < 9) {
      setPhoneError(t('checkout.phoneTooShort'));
      return false;
    }
    setPhoneError('');
    return true;
  };

  useEffect(() => {
    if (!tour) {
      toast.error(t('checkout.tourNotFound'));
      navigate('/tours');
    }
  }, [tour, navigate, t]);

  if (!tour) return null;

  // Tính toán chi phí
  const basePrice = (formData.adults * tour.price) + (formData.children * tour.price * 0.7);
  const insuranceCost = formData.services.insurance ? (formData.adults + formData.children) * 50000 : 0;
  const pickupCost = formData.services.pickup ? 200000 : 0;
  
  let subtotal = basePrice + insuranceCost + pickupCost;
  let discount = promoApplied ? subtotal * 0.1 : 0; // 10% discount for demo
  let total = subtotal - discount;

  const handleNext = () => {
    // Validate Step 1
    if (currentStep === 1) {
      const isPhoneValid = validatePhone(formData.phone);
      if (!formData.name || !formData.phone || !formData.date || !isPhoneValid) {
        toast.error(t('checkout.missingRequiredFields'));
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (formData.promoCode.toUpperCase() === 'GIALAI10') {
      setPromoApplied(true);
      toast.success(t('checkout.promoSuccess'));
    } else {
      setPromoApplied(false);
      toast.error(t('checkout.promoInvalid'));
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Giả lập xử lý thanh toán
    setTimeout(() => {
      setIsProcessing(false);
      
      const code = 'GL-' + Math.random().toString(36).substr(2, 6).toUpperCase();
      
      addBooking({
        id: code,
        tourId: tour.id,
        tourName: tour.name,
        image: tour.image,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        date: formData.date,
        adults: formData.adults,
        children: formData.children,
        totalPrice: total,
        status: 'completed',
        createdAt: new Date().toISOString(),
        paymentMethod: formData.paymentMethod
      });

      toast.success(t('checkout.paymentSuccess'));
      navigate(`/booking-confirmation/${code}`);
    }, 2000);
  };

  return (
    <>
      <SEO title={`${t('checkout.pageTitle')} - ${tour.name[lang] || tour.name}`} description={t('checkout.pageDesc')} />
      <div className="page-container min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-dark-200 dark:bg-slate-700 rounded-full z-0">
              <div 
                className="h-full bg-primary-500 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep - 1) * 50}%` }}
              />
            </div>
            
            {[
              { num: 1, label: t('checkout.step1') },
              { num: 2, label: t('checkout.step2') },
              { num: 3, label: t('checkout.step3') }
            ].map((step) => (
              <div key={step.num} className="relative z-10 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-slate-50 dark:border-slate-900 transition-colors duration-300 ${currentStep >= step.num ? 'bg-primary-500 text-white' : 'bg-dark-200 dark:bg-slate-700 text-dark-500 dark:text-slate-400'}`}>
                  {step.num}
                </div>
                <span className={`mt-2 text-xs font-semibold ${currentStep >= step.num ? 'text-primary-600 dark:text-primary-400' : 'text-dark-400'}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Form Area */}
          <div className="flex-1">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-6 sm:p-8 border border-dark-100 dark:border-slate-700 animate-fade-in-up">
              
              {/* STEP 1: Thông tin liên hệ */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">{t('checkout.contactInfoTitle')}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-1 dark:text-slate-300">{t('checkout.fullName')}</label>
                      <input type="text" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full bg-dark-50 dark:bg-slate-900 border border-dark-200 dark:border-slate-600 rounded-xl px-4 py-3 text-sm dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" placeholder={t('checkout.fullNamePlaceholder')} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 dark:text-slate-300">{t('checkout.phone')}</label>
                      <input 
                        type="tel" 
                        value={formData.phone} 
                        onChange={e => {
                          setFormData({...formData, phone: e.target.value});
                          if (phoneError) validatePhone(e.target.value);
                        }} 
                        onBlur={(e) => validatePhone(e.target.value)}
                        className={`w-full bg-dark-50 dark:bg-slate-900 border ${phoneError ? 'border-red-500 focus:ring-red-500' : 'border-dark-200 dark:border-slate-600 focus:ring-primary-500'} rounded-xl px-4 py-3 text-sm dark:text-white focus:ring-2 focus:border-transparent outline-none transition-all`} 
                        placeholder={t('checkout.phonePlaceholder')} 
                      />
                      {phoneError && <span className="text-red-500 text-xs mt-1 block">{phoneError}</span>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1 dark:text-slate-300">{t('checkout.email')}</label>
                      <input type="email" value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} className="w-full bg-dark-50 dark:bg-slate-900 border border-dark-200 dark:border-slate-600 rounded-xl px-4 py-3 text-sm dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" placeholder={t('checkout.emailPlaceholder')} />
                    </div>
                  </div>

                  <hr className="border-dark-100 dark:border-slate-700 my-6" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-1 dark:text-slate-300">{t('checkout.departureDate')}</label>
                      <input type="date" value={formData.date} onChange={e=>setFormData({...formData, date: e.target.value})} className="w-full bg-dark-50 dark:bg-slate-900 border border-dark-200 dark:border-slate-600 rounded-xl px-4 py-3 text-sm dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 dark:text-slate-300">{t('checkout.adults')}</label>
                      <div className="flex items-center">
                        <button type="button" onClick={() => setFormData(p => ({...p, adults: Math.max(1, p.adults - 1)}))} className="w-10 h-10 rounded-l-xl bg-dark-100 dark:bg-slate-700 flex items-center justify-center hover:bg-dark-200 dark:hover:bg-slate-600 dark:text-white transition-colors">-</button>
                        <div className="flex-1 h-10 flex items-center justify-center bg-dark-50 dark:bg-slate-900 border-y border-dark-200 dark:border-slate-600 font-semibold dark:text-white">{formData.adults}</div>
                        <button type="button" onClick={() => setFormData(p => ({...p, adults: p.adults + 1}))} className="w-10 h-10 rounded-r-xl bg-dark-100 dark:bg-slate-700 flex items-center justify-center hover:bg-dark-200 dark:hover:bg-slate-600 dark:text-white transition-colors">+</button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 dark:text-slate-300">{t('checkout.children')}</label>
                      <div className="flex items-center">
                        <button type="button" onClick={() => setFormData(p => ({...p, children: Math.max(0, p.children - 1)}))} className="w-10 h-10 rounded-l-xl bg-dark-100 dark:bg-slate-700 flex items-center justify-center hover:bg-dark-200 dark:hover:bg-slate-600 dark:text-white transition-colors">-</button>
                        <div className="flex-1 h-10 flex items-center justify-center bg-dark-50 dark:bg-slate-900 border-y border-dark-200 dark:border-slate-600 font-semibold dark:text-white">{formData.children}</div>
                        <button type="button" onClick={() => setFormData(p => ({...p, children: p.children + 1}))} className="w-10 h-10 rounded-r-xl bg-dark-100 dark:bg-slate-700 flex items-center justify-center hover:bg-dark-200 dark:hover:bg-slate-600 dark:text-white transition-colors">+</button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 flex justify-end">
                    <button type="button" onClick={handleNext} className="btn-primary px-8">{t('checkout.continue')}</button>
                  </div>
                </div>
              )}

              {/* STEP 2: Dịch vụ đi kèm */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">{t('checkout.servicesTitle')}</h2>
                  
                  <div className="space-y-4">
                    <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.services.insurance ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/20' : 'border-dark-100 dark:border-slate-700 hover:border-primary-300'}`}>
                      <div className="pt-1">
                        <input type="checkbox" checked={formData.services.insurance} onChange={(e) => setFormData(p => ({...p, services: {...p.services, insurance: e.target.checked}}))} className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-dark-900 dark:text-white">{t('checkout.insuranceName')}</h4>
                        <p className="text-sm text-dark-500 dark:text-slate-400 mt-1">{t('checkout.insuranceDesc')}</p>
                      </div>
                      <div className="font-bold text-primary-600 dark:text-primary-400">
                        +50k<span className="text-xs font-normal text-dark-400">{t('checkout.perGuest')}</span>
                      </div>
                    </label>

                    <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.services.pickup ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/20' : 'border-dark-100 dark:border-slate-700 hover:border-primary-300'}`}>
                      <div className="pt-1">
                        <input type="checkbox" checked={formData.services.pickup} onChange={(e) => setFormData(p => ({...p, services: {...p.services, pickup: e.target.checked}}))} className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-dark-900 dark:text-white">{t('checkout.pickupName')}</h4>
                        <p className="text-sm text-dark-500 dark:text-slate-400 mt-1">{t('checkout.pickupDesc')}</p>
                      </div>
                      <div className="font-bold text-primary-600 dark:text-primary-400">
                        +200k<span className="text-xs font-normal text-dark-400">{t('checkout.perTrip')}</span>
                      </div>
                    </label>
                  </div>

                  <div className="pt-6 flex justify-between">
                    <button type="button" onClick={handleBack} className="px-6 py-2 rounded-xl text-dark-600 dark:text-slate-300 font-medium hover:bg-dark-100 dark:hover:bg-slate-700 transition-colors">{t('checkout.back')}</button>
                    <button type="button" onClick={handleNext} className="btn-primary px-8">{t('checkout.continue')}</button>
                  </div>
                </div>
              )}

              {/* STEP 3: Thanh toán */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">{t('checkout.paymentTitle')}</h2>
                  
                  <div className="space-y-4">
                    {[
                      { id: 'vnpay', label: t('checkout.vnpay'), icon: '🏦', desc: t('checkout.vnpayDesc') },
                      { id: 'momo', label: t('checkout.momo'), icon: '📱', desc: t('checkout.momoDesc') },
                      { id: 'visa', label: t('checkout.visa'), icon: '💳', desc: t('checkout.visaDesc') }
                    ].map(method => (
                      <label key={method.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.paymentMethod === method.id ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/20' : 'border-dark-100 dark:border-slate-700 hover:border-primary-300'}`}>
                        <div className="flex-shrink-0">
                          <input type="radio" name="paymentMethod" value={method.id} checked={formData.paymentMethod === method.id} onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})} className="w-5 h-5 text-primary-600 focus:ring-primary-500" />
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-xl border border-dark-100 dark:border-slate-700">
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-dark-900 dark:text-white">{method.label}</h4>
                          <p className="text-xs text-dark-500 dark:text-slate-400">{method.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="pt-6 flex justify-between">
                    <button type="button" onClick={handleBack} disabled={isProcessing} className="px-6 py-2 rounded-xl text-dark-600 dark:text-slate-300 font-medium hover:bg-dark-100 dark:hover:bg-slate-700 transition-colors">{t('checkout.back')}</button>
                    <button type="button" onClick={handlePayment} disabled={isProcessing} className="btn-primary px-8 relative overflow-hidden">
                      {isProcessing ? <span className="animate-pulse">{t('checkout.processing')}</span> : t('checkout.payNow')}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Sticky Order Summary Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card p-6 border border-dark-100 dark:border-slate-700 sticky top-24">
              <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-4">{t('checkout.summaryTitle')}</h3>
              
              <div className="flex gap-4 mb-6">
                <img src={tour.image} alt={tour.name[lang] || tour.name} className="w-20 h-20 object-cover rounded-xl shadow-sm" />
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-dark-900 dark:text-white line-clamp-2 leading-tight">{tour.name[lang] || tour.name}</h4>
                  <p className="text-xs text-dark-500 dark:text-slate-400 mt-1">{tour.duration[lang] || tour.duration}</p>
                </div>
              </div>

              {formData.date && (
                <div className="flex justify-between text-sm mb-2 text-dark-600 dark:text-slate-300">
                  <span>{t('checkout.departureDate').replace(' *','')}</span>
                  <span className="font-semibold">{formData.date}</span>
                </div>
              )}
              
              <hr className="border-dark-100 dark:border-slate-700 my-4" />
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-dark-600 dark:text-slate-300">
                  <span>{t('checkout.adults')} x {formData.adults}</span>
                  <span>{(formData.adults * tour.price).toLocaleString(lang === 'vi' ? 'vi-VN' : 'en-US')}đ</span>
                </div>
                {formData.children > 0 && (
                  <div className="flex justify-between text-dark-600 dark:text-slate-300">
                    <span>{t('checkout.children').replace(' (Giảm 30%)', '').replace(' (30% off)', '')} x {formData.children}</span>
                    <span>{(formData.children * tour.price * 0.7).toLocaleString(lang === 'vi' ? 'vi-VN' : 'en-US')}đ</span>
                  </div>
                )}
                {insuranceCost > 0 && (
                  <div className="flex justify-between text-dark-600 dark:text-slate-300">
                    <span>{t('checkout.insurance')}</span>
                    <span>{insuranceCost.toLocaleString(lang === 'vi' ? 'vi-VN' : 'en-US')}đ</span>
                  </div>
                )}
                {pickupCost > 0 && (
                  <div className="flex justify-between text-dark-600 dark:text-slate-300">
                    <span>{t('checkout.pickup')}</span>
                    <span>{pickupCost.toLocaleString(lang === 'vi' ? 'vi-VN' : 'en-US')}đ</span>
                  </div>
                )}
              </div>

              <hr className="border-dark-100 dark:border-slate-700 my-4" />

              {/* Promo code input (Only show in step 3 or let it be always available) */}
              <div className="mb-4">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input type="text" value={formData.promoCode} onChange={(e)=>setFormData({...formData, promoCode: e.target.value})} placeholder={t('checkout.promoPlaceholder')} disabled={promoApplied} className="flex-1 bg-dark-50 dark:bg-slate-900 border border-dark-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm dark:text-white focus:outline-none focus:border-primary-500 uppercase disabled:opacity-50" />
                  <button type="submit" disabled={promoApplied || !formData.promoCode} className="px-4 py-2 bg-dark-800 dark:bg-slate-700 text-white rounded-lg text-sm font-semibold hover:bg-black dark:hover:bg-slate-600 disabled:opacity-50 transition-colors">
                    {promoApplied ? t('checkout.applied') : t('checkout.apply')}
                  </button>
                </form>
                {promoApplied && (
                  <div className="flex justify-between text-sm mt-3 text-green-600 dark:text-green-400 font-medium">
                    <span>{t('checkout.discount')} (10%)</span>
                    <span>- {discount.toLocaleString(lang === 'vi' ? 'vi-VN' : 'en-US')}đ</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-end">
                <span className="font-bold text-dark-900 dark:text-white">{t('checkout.total')}</span>
                <span className="text-2xl font-black text-primary-600 dark:text-primary-400">{total.toLocaleString(lang === 'vi' ? 'vi-VN' : 'en-US')}đ</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
