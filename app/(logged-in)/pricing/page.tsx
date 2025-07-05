"use client";

import React, { useState } from 'react';
import { Check, Star, Zap, Crown, Shield, Sparkles, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? 9 : 90,
      period: billingCycle === 'monthly' ? 'month' : 'year',
      description: 'Perfect for individuals and small teams',
      features: [
        'Up to 5 projects',
        'Basic dashboard',
        'Email support',
        '5GB storage',
        'Core integrations',
        'Mobile app access'
      ],
      popular: false,
      gradient: 'from-blue-400 to-cyan-500',
      icon: Star
    },
    {
      name: 'Professional',
      price: billingCycle === 'monthly' ? 19 : 190,
      period: billingCycle === 'monthly' ? 'month' : 'year',
      description: 'Everything you need to scale your business',
      features: [
        'Unlimited projects',
        'Advanced analytics',
        'Priority support',
        '50GB storage',
        'All integrations',
        'Team collaboration',
        'Custom workflows',
        'API access'
      ],
      popular: true,
      gradient: 'from-pink-400 to-purple-600',
      icon: Zap
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Advanced features for large organizations',
      features: [
        'Everything in Professional',
        'Unlimited storage',
        'Dedicated support',
        'Custom integrations',
        'SSO & advanced security',
        'SLA guarantee',
        'On-premise deployment',
        'Custom training'
      ],
      popular: false,
      gradient: 'from-gray-600 to-gray-800',
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100">
      {/* Premium Feature Header */}
      <div className="bg-white/70 backdrop-blur-md border-b border-pink-200/50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-2 text-pink-600">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Premium Feature
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
            <div className="flex items-center">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 relative ${
                  billingCycle === 'yearly'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="absolute -top-3 -right-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                  -20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={index}
                className={`relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border-2 transition-all duration-500 hover:scale-105 hover:shadow-3xl ${
                  plan.popular 
                    ? 'border-pink-300 ring-4 ring-pink-200/50 lg:scale-105' 
                    : 'border-white/30 hover:border-pink-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                      <Crown className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{plan.name}</h3>
                    <p className="text-gray-600 text-lg">{plan.description}</p>
                  </div>

                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-6xl font-bold text-gray-900">
                        {typeof plan.price === 'string' ? plan.price : `$${plan.price}`}
                      </span>
                      {typeof plan.price === 'number' && (
                        <span className="text-xl text-gray-600 ml-2">/{plan.period}</span>
                      )}
                    </div>
                    {billingCycle === 'yearly' && typeof plan.price === 'number' && (
                      <p className="text-sm text-emerald-600 font-medium">
                        Save ${(plan.price * 12) - (plan.price * 10)} annually
                      </p>
                    )}
                  </div>

                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-700 text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-xl hover:shadow-2xl'
                        : 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subscription Required Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 text-center shadow-2xl border border-pink-200/50">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Subscription Required
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            You need to upgrade to the Basic Plan or the Pro Plan to access this feature 💖
          </p>
          <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto">
            <span>View Pricing Plans</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
              <div className="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime guaranteed</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
              <div className="text-3xl font-bold text-gray-900 mb-2">50k+</div>
              <div className="text-gray-600">Happy customers</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/30">
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Expert support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}