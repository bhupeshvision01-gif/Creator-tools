import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, Search, DollarSign, Heart, BarChart3, Users, TrendingUp, 
  BookOpen, X, Play, Award, Target, Zap, Percent, Scale, ArrowUp, Clock, Shield
} from 'lucide-react';

interface InputField {
  name: string;
  label: string;
  type: 'number';
  defaultValue: number;
  placeholder?: string;
  unit?: string;
  min?: number;
  max?: number;
}

interface CalculationResult {
  label: string;
  value: number | string;
  unit?: string;
  formatted?: string;
}

interface CalculatorType {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  inputs: InputField[];
  calculate: (values: Record<string, number>) => CalculationResult[];
  formula: string;
  formulaExplanation?: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  content: string;
  image?: string;
}

const calculators: CalculatorType[] = [
  // Creator Tools - 15
  {
    id: 'youtube-earnings',
    title: 'YouTube Earnings Calculator',
    category: 'Creator Economy',
    description: 'Estimate your monthly YouTube revenue based on views and CPM',
    icon: <DollarSign className="w-6 h-6" />,
    inputs: [
      { name: 'views', label: 'Monthly Views', type: 'number', defaultValue: 100000, placeholder: '100000', unit: 'views' },
      { name: 'cpm', label: 'Average CPM ($)', type: 'number', defaultValue: 5, placeholder: '5', unit: '$', min: 0.1, max: 50 },
    ],
    calculate: (v) => [
      { label: 'Estimated Monthly Revenue', value: (v.views * v.cpm) / 1000, unit: '$', formatted: 'currency' },
      { label: 'Per 1,000 Views', value: v.cpm, unit: '$' },
      { label: 'Daily Average', value: ((v.views * v.cpm) / 1000) / 30, unit: '$', formatted: 'currency' },
    ],
    formula: 'Revenue = (Views × CPM) / 1000',
    formulaExplanation: 'CPM is the cost per mille (thousand views).',
  },
  {
    id: 'instagram-engagement',
    title: 'Instagram Engagement Rate Calculator',
    category: 'Creator Economy',
    description: 'Calculate your Instagram post engagement rate',
    icon: <Users className="w-6 h-6" />,
    inputs: [
      { name: 'followers', label: 'Followers', type: 'number', defaultValue: 50000, unit: 'followers' },
      { name: 'likes', label: 'Average Likes per Post', type: 'number', defaultValue: 2500 },
      { name: 'comments', label: 'Average Comments per Post', type: 'number', defaultValue: 180 },
    ],
    calculate: (v) => {
      const totalEngagement = v.likes + v.comments;
      const rate = (totalEngagement / v.followers) * 100;
      return [
        { label: 'Engagement Rate', value: rate, unit: '%', formatted: 'percent' },
        { label: 'Total Engagement', value: totalEngagement, unit: 'interactions' },
        { label: 'Rating', value: rate > 5 ? 'Excellent' : rate > 3 ? 'Good' : 'Average' },
      ];
    },
    formula: 'Engagement Rate = ((Likes + Comments) / Followers) × 100',
  },
  {
    id: 'tiktok-engagement',
    title: 'TikTok Engagement Calculator',
    category: 'Creator Economy',
    description: 'Measure TikTok video performance and virality',
    icon: <Play className="w-6 h-6" />,
    inputs: [
      { name: 'views', label: 'Average Views', type: 'number', defaultValue: 45000 },
      { name: 'likes', label: 'Average Likes', type: 'number', defaultValue: 6200 },
      { name: 'shares', label: 'Average Shares', type: 'number', defaultValue: 890 },
      { name: 'comments', label: 'Average Comments', type: 'number', defaultValue: 420 },
    ],
    calculate: (v) => {
      const engagement = v.likes + v.shares * 2 + v.comments * 1.5;
      const rate = (engagement / v.views) * 100;
      return [
        { label: 'Engagement Rate', value: rate, unit: '%', formatted: 'percent' },
        { label: 'Virality Score', value: v.shares / v.views * 100, unit: '%', formatted: 'percent' },
        { label: 'Total Interactions', value: v.likes + v.shares + v.comments },
      ];
    },
    formula: 'Engagement = Likes + (Shares × 2) + (Comments × 1.5)',
  },
  {
    id: 'cpm-calculator',
    title: 'CPM Calculator',
    category: 'Creator Economy',
    description: 'Calculate your CPM from earnings and impressions',
    icon: <BarChart3 className="w-6 h-6" />,
    inputs: [
      { name: 'earnings', label: 'Total Earnings ($)', type: 'number', defaultValue: 1250, unit: '$' },
      { name: 'impressions', label: 'Total Impressions', type: 'number', defaultValue: 245000 },
    ],
    calculate: (v) => [
      { label: 'CPM', value: (v.earnings / v.impressions) * 1000, unit: '$' },
      { label: 'Revenue per 1000 Views', value: (v.earnings / v.impressions) * 1000, unit: '$' },
    ],
    formula: 'CPM = (Earnings ÷ Impressions) × 1000',
  },
  {
    id: 'rpm-calculator',
    title: 'RPM Calculator',
    category: 'Creator Economy',
    description: 'Calculate Revenue Per Mille (RPM)',
    icon: <TrendingUp className="w-6 h-6" />,
    inputs: [
      { name: 'revenue', label: 'Total Revenue ($)', type: 'number', defaultValue: 850 },
      { name: 'views', label: 'Total Views', type: 'number', defaultValue: 125000 },
    ],
    calculate: (v) => [
      { label: 'RPM', value: (v.revenue / v.views) * 1000, unit: '$' },
    ],
    formula: 'RPM = (Revenue ÷ Views) × 1000',
  },
  {
    id: 'affiliate-commission',
    title: 'Affiliate Commission Calculator',
    category: 'Creator Economy',
    description: 'Calculate earnings from affiliate sales',
    icon: <DollarSign className="w-6 h-6" />,
    inputs: [
      { name: 'sales', label: 'Total Sales Amount ($)', type: 'number', defaultValue: 4500 },
      { name: 'rate', label: 'Commission Rate (%)', type: 'number', defaultValue: 25, unit: '%', max: 100 },
      { name: 'salesCount', label: 'Number of Sales', type: 'number', defaultValue: 32 },
    ],
    calculate: (v) => {
      const commission = v.sales * (v.rate / 100);
      return [
        { label: 'Total Commission', value: commission, unit: '$', formatted: 'currency' },
        { label: 'Commission per Sale', value: commission / v.salesCount, unit: '$', formatted: 'currency' },
        { label: 'Effective Rate', value: v.rate, unit: '%' },
      ];
    },
    formula: 'Commission = Sales × (Rate / 100)',
  },
  {
    id: 'influencer-rate',
    title: 'Influencer Rate Calculator',
    category: 'Creator Economy',
    description: 'Estimate how much brands should pay you',
    icon: <Award className="w-6 h-6" />,
    inputs: [
      { name: 'followers', label: 'Total Followers', type: 'number', defaultValue: 75000 },
      { name: 'engagementRate', label: 'Engagement Rate (%)', type: 'number', defaultValue: 4.2, unit: '%' },
    ],
    calculate: (v) => {
      const baseRate = v.followers / 1000 * 12;
      const adjusted = baseRate * (v.engagementRate / 3);
      return [
        { label: 'Suggested Post Rate', value: adjusted, unit: '$', formatted: 'currency' },
        { label: 'Story Rate', value: adjusted * 0.6, unit: '$', formatted: 'currency' },
        { label: 'Reel Rate', value: adjusted * 1.4, unit: '$', formatted: 'currency' },
      ];
    },
    formula: 'Post Rate ≈ (Followers / 1000 × $12) × (ER / 3)',
  },
  {
    id: 'ad-revenue',
    title: 'Ad Revenue Estimator',
    category: 'Creator Economy',
    description: 'Estimate ad revenue from multiple platforms',
    icon: <BarChart3 className="w-6 h-6" />,
    inputs: [
      { name: 'youtubeViews', label: 'YouTube Views', type: 'number', defaultValue: 80000 },
      { name: 'igImpressions', label: 'IG Impressions', type: 'number', defaultValue: 35000 },
      { name: 'cpm', label: 'Avg CPM', type: 'number', defaultValue: 6.5 },
    ],
    calculate: (v) => {
      const yt = (v.youtubeViews / 1000) * v.cpm * 0.55;
      const ig = (v.igImpressions / 1000) * v.cpm * 0.35;
      return [
        { label: 'YouTube Revenue', value: yt, unit: '$', formatted: 'currency' },
        { label: 'Instagram Revenue', value: ig, unit: '$', formatted: 'currency' },
        { label: 'Total Estimated', value: yt + ig, unit: '$', formatted: 'currency' },
      ];
    },
    formula: 'Revenue = (Impressions / 1000) × CPM × Platform Factor',
  },

  // Finance - 12
  {
    id: 'roi-calculator',
    title: 'ROI Calculator',
    category: 'Finance',
    description: 'Calculate Return on Investment',
    icon: <TrendingUp className="w-6 h-6" />,
    inputs: [
      { name: 'investment', label: 'Initial Investment ($)', type: 'number', defaultValue: 2500 },
      { name: 'return', label: 'Total Return ($)', type: 'number', defaultValue: 4300 },
    ],
    calculate: (v) => {
      const roi = ((v.return - v.investment) / v.investment) * 100;
      return [
        { label: 'ROI', value: roi, unit: '%', formatted: 'percent' },
        { label: 'Net Profit', value: v.return - v.investment, unit: '$', formatted: 'currency' },
      ];
    },
    formula: 'ROI = ((Return - Investment) / Investment) × 100',
  },
  {
    id: 'profit-margin',
    title: 'Profit Margin Calculator',
    category: 'Finance',
    description: 'Calculate gross and net profit margins',
    icon: <DollarSign className="w-6 h-6" />,
    inputs: [
      { name: 'revenue', label: 'Revenue ($)', type: 'number', defaultValue: 12500 },
      { name: 'cost', label: 'Cost of Goods ($)', type: 'number', defaultValue: 6700 },
    ],
    calculate: (v) => {
      const profit = v.revenue - v.cost;
      const margin = (profit / v.revenue) * 100;
      return [
        { label: 'Gross Profit', value: profit, unit: '$', formatted: 'currency' },
        { label: 'Profit Margin', value: margin, unit: '%', formatted: 'percent' },
      ];
    },
    formula: 'Margin = (Revenue - Cost) / Revenue × 100',
  },
  {
    id: 'break-even',
    title: 'Break Even Calculator',
    category: 'Finance',
    description: 'Find out when your business becomes profitable',
    icon: <Target className="w-6 h-6" />,
    inputs: [
      { name: 'fixedCosts', label: 'Fixed Costs ($)', type: 'number', defaultValue: 4500 },
      { name: 'pricePerUnit', label: 'Price Per Unit ($)', type: 'number', defaultValue: 45 },
      { name: 'variableCost', label: 'Variable Cost Per Unit ($)', type: 'number', defaultValue: 18 },
    ],
    calculate: (v) => {
      const beUnits = Math.ceil(v.fixedCosts / (v.pricePerUnit - v.variableCost));
      return [
        { label: 'Break Even Units', value: beUnits },
        { label: 'Break Even Revenue', value: beUnits * v.pricePerUnit, unit: '$', formatted: 'currency' },
      ];
    },
    formula: 'Break Even Units = Fixed Costs / (Price - Variable Cost)',
  },
  {
    id: 'markup-calculator',
    title: 'Markup Calculator',
    category: 'Finance',
    description: 'Calculate markup and selling price',
    icon: <Percent className="w-6 h-6" />,
    inputs: [
      { name: 'cost', label: 'Cost Price ($)', type: 'number', defaultValue: 120 },
      { name: 'markup', label: 'Markup %', type: 'number', defaultValue: 65, unit: '%' },
    ],
    calculate: (v) => {
      const markupAmount = v.cost * (v.markup / 100);
      const selling = v.cost + markupAmount;
      return [
        { label: 'Selling Price', value: selling, unit: '$', formatted: 'currency' },
        { label: 'Markup Amount', value: markupAmount, unit: '$', formatted: 'currency' },
        { label: 'Profit Margin %', value: (markupAmount / selling) * 100, unit: '%', formatted: 'percent' },
      ];
    },
    formula: 'Selling Price = Cost × (1 + Markup/100)',
  },

  // Health & Fitness - 13
  {
    id: 'bmi-calculator',
    title: 'BMI Calculator',
    category: 'Health & Fitness',
    description: 'Body Mass Index calculator with health category',
    icon: <Scale className="w-6 h-6" />,
    inputs: [
      { name: 'weight', label: 'Weight (kg)', type: 'number', defaultValue: 72, unit: 'kg' },
      { name: 'height', label: 'Height (cm)', type: 'number', defaultValue: 172, unit: 'cm' },
    ],
    calculate: (v) => {
      const bmi = v.weight / Math.pow(v.height / 100, 2);
      let category = '';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';
      return [
        { label: 'BMI', value: bmi.toFixed(1) },
        { label: 'Category', value: category },
      ];
    },
    formula: 'BMI = Weight(kg) / (Height(m))²',
  },
  {
    id: 'bmr-calculator',
    title: 'BMR Calculator',
    category: 'Health & Fitness',
    description: 'Basal Metabolic Rate (Calories you burn at rest)',
    icon: <Heart className="w-6 h-6" />,
    inputs: [
      { name: 'weight', label: 'Weight (kg)', type: 'number', defaultValue: 75 },
      { name: 'height', label: 'Height (cm)', type: 'number', defaultValue: 175 },
      { name: 'age', label: 'Age (years)', type: 'number', defaultValue: 28 },
      { name: 'gender', label: 'Gender', type: 'number', defaultValue: 1 }, // 1 male 0 female but we use select like
    ],
    calculate: (v) => {
      // Harris Benedict
      let bmr = 0;
      if (v.gender === 1) {
        bmr = 88.362 + (13.397 * v.weight) + (4.799 * v.height) - (5.677 * v.age);
      } else {
        bmr = 447.593 + (9.247 * v.weight) + (3.098 * v.height) - (4.330 * v.age);
      }
      return [
        { label: 'BMR', value: Math.round(bmr), unit: 'calories/day' },
        { label: 'Daily Maintenance', value: Math.round(bmr * 1.55), unit: 'calories' },
      ];
    },
    formula: 'Men: 88.362 + (13.397×weight) + (4.799×height) - (5.677×age)',
    formulaExplanation: 'Women use different constants.',
  },
  {
    id: 'calories-burned',
    title: 'Calories Burned Calculator',
    category: 'Health & Fitness',
    description: 'Estimate calories burned during exercise',
    icon: <Zap className="w-6 h-6" />,
    inputs: [
      { name: 'weight', label: 'Body Weight (kg)', type: 'number', defaultValue: 70 },
      { name: 'duration', label: 'Duration (minutes)', type: 'number', defaultValue: 45 },
      { name: 'intensity', label: 'MET Intensity', type: 'number', defaultValue: 7.5 }, // e.g. running 7.5
    ],
    calculate: (v) => {
      const cal = v.intensity * v.weight * (v.duration / 60);
      return [
        { label: 'Calories Burned', value: Math.round(cal), unit: 'kcal' },
        { label: 'Per Hour Rate', value: Math.round(cal / (v.duration / 60)), unit: 'kcal/hr' },
      ];
    },
    formula: 'Calories = MET × Weight × Time(hours)',
  },
  {
    id: 'body-fat',
    title: 'Body Fat Percentage Calculator',
    category: 'Health & Fitness',
    description: 'Estimate body fat % (US Navy method)',
    icon: <Scale className="w-6 h-6" />,
    inputs: [
      { name: 'gender', label: 'Gender (1=M, 0=F)', type: 'number', defaultValue: 1 },
      { name: 'waist', label: 'Waist (cm)', type: 'number', defaultValue: 82 },
      { name: 'neck', label: 'Neck (cm)', type: 'number', defaultValue: 38 },
      { name: 'height', label: 'Height (cm)', type: 'number', defaultValue: 175 },
    ],
    calculate: (v) => {
      let bf = 0;
      if (v.gender === 1) {
        bf = 86.010 * Math.log10(v.waist - v.neck) - 70.041 * Math.log10(v.height) + 36.76;
      } else {
        bf = 163.205 * Math.log10(v.waist + v.neck - v.height) - 97.684 * Math.log10(v.height) - 78.387;
      }
      return [{ label: 'Body Fat %', value: bf.toFixed(1), unit: '%' }];
    },
    formula: 'US Navy Body Fat Formula',
  },

  // Marketing Calculators - 12
  {
    id: 'ctr-calculator',
    title: 'CTR Calculator',
    category: 'Business Tools',
    description: 'Click Through Rate',
    icon: <Target className="w-6 h-6" />,
    inputs: [
      { name: 'clicks', label: 'Clicks', type: 'number', defaultValue: 245 },
      { name: 'impressions', label: 'Impressions', type: 'number', defaultValue: 12400 },
    ],
    calculate: (v) => [
      { label: 'CTR', value: (v.clicks / v.impressions) * 100, unit: '%', formatted: 'percent' },
    ],
    formula: 'CTR = (Clicks / Impressions) × 100',
  },
  {
    id: 'conversion-rate',
    title: 'Conversion Rate Calculator',
    category: 'Business Tools',
    description: 'Measure how well your funnel converts',
    icon: <Percent className="w-6 h-6" />,
    inputs: [
      { name: 'conversions', label: 'Conversions', type: 'number', defaultValue: 87 },
      { name: 'visitors', label: 'Total Visitors', type: 'number', defaultValue: 3200 },
    ],
    calculate: (v) => [
      { label: 'Conversion Rate', value: (v.conversions / v.visitors) * 100, unit: '%', formatted: 'percent' },
    ],
    formula: 'Conversion Rate = (Conversions / Visitors) × 100',
  },
  {
    id: 'cpc-calculator',
    title: 'CPC Calculator',
    category: 'Business Tools',
    description: 'Cost Per Click',
    icon: <DollarSign className="w-6 h-6" />,
    inputs: [
      { name: 'cost', label: 'Total Campaign Cost ($)', type: 'number', defaultValue: 1250 },
      { name: 'clicks', label: 'Total Clicks', type: 'number', defaultValue: 680 },
    ],
    calculate: (v) => [
      { label: 'Cost Per Click', value: v.cost / v.clicks, unit: '$', formatted: 'currency' },
    ],
    formula: 'CPC = Total Cost / Clicks',
  },
  // General Calculators - 12
  {
    id: 'percentage-calculator',
    title: 'Percentage Calculator',
    category: 'Math & Science',
    description: 'Calculate percentages easily',
    icon: <Percent className="w-6 h-6" />,
    inputs: [
      { name: 'number', label: 'Number', type: 'number', defaultValue: 450 },
      { name: 'percent', label: 'Percent (%)', type: 'number', defaultValue: 15, unit: '%' },
    ],
    calculate: (v) => [
      { label: 'Percentage Of', value: v.number * (v.percent / 100), unit: '' },
      { label: 'Percent Of Number', value: (v.percent / v.number) * 100, unit: '%', formatted: 'percent' },
    ],
    formula: 'X% of Y = Y × (X / 100)',
  },
  {
    id: 'simple-interest',
    title: 'Simple Interest Calculator',
    category: 'Math & Science',
    description: 'Calculate interest over time',
    icon: <DollarSign className="w-6 h-6" />,
    inputs: [
      { name: 'principal', label: 'Principal ($)', type: 'number', defaultValue: 5000 },
      { name: 'rate', label: 'Annual Rate (%)', type: 'number', defaultValue: 6.5 },
      { name: 'time', label: 'Time (years)', type: 'number', defaultValue: 3 },
    ],
    calculate: (v) => {
      const interest = v.principal * (v.rate / 100) * v.time;
      return [
        { label: 'Interest Earned', value: interest, unit: '$', formatted: 'currency' },
        { label: 'Total Amount', value: v.principal + interest, unit: '$', formatted: 'currency' },
      ];
    },
    formula: 'Interest = Principal × Rate × Time',
  },
  {
    id: 'average-calculator',
    title: 'Average Calculator',
    category: 'Math & Science',
    description: 'Find mean of multiple numbers',
    icon: <BarChart3 className="w-6 h-6" />,
    inputs: [
      { name: 'num1', label: 'Number 1', type: 'number', defaultValue: 87 },
      { name: 'num2', label: 'Number 2', type: 'number', defaultValue: 92 },
      { name: 'num3', label: 'Number 3', type: 'number', defaultValue: 76 },
      { name: 'num4', label: 'Number 4', type: 'number', defaultValue: 81 },
    ],
    calculate: (v) => {
      const avg = (v.num1 + v.num2 + v.num3 + v.num4) / 4;
      return [{ label: 'Average', value: avg.toFixed(2) }];
    },
    formula: 'Average = Sum of values / Count',
  },
  // New Creator Economy Calculators (no duplicates)
  {
    id: 'youtube-income',
    title: 'YouTube Income Calculator',
    category: 'Creator Economy',
    description: 'Views × CPM × Ads → Revenue estimate',
    icon: <DollarSign className="w-6 h-6" />,
    inputs: [
      { name: 'views', label: 'Total Views', type: 'number', defaultValue: 500000 },
      { name: 'cpm', label: 'CPM Rate ($)', type: 'number', defaultValue: 4.5, unit: '$' },
      { name: 'adRate', label: 'Ad Fill Rate (%)', type: 'number', defaultValue: 65, unit: '%' },
    ],
    calculate: (v) => [{ label: 'Estimated Revenue', value: (v.views / 1000 * v.cpm) * (v.adRate / 100), unit: '$', formatted: 'currency' }],
    formula: 'Revenue = (Views / 1000) × CPM × (Ad Rate / 100)',
  },
  {
    id: 'tiktok-earnings',
    title: 'TikTok Earnings Calculator',
    category: 'Creator Economy',
    description: 'Views × CPM × Creator Fund → Revenue estimate',
    icon: <Play className="w-6 h-6" />,
    inputs: [
      { name: 'views', label: 'Total Views', type: 'number', defaultValue: 1200000 },
      { name: 'cpm', label: 'Creator Fund CPM ($)', type: 'number', defaultValue: 0.04, unit: '$' },
    ],
    calculate: (v) => [{ label: 'Estimated Earnings', value: v.views * v.cpm, unit: '$', formatted: 'currency' }],
    formula: 'Earnings = Views × CPM',
  },
  {
    id: 'brand-deal',
    title: 'Brand Deal Calculator',
    category: 'Creator Economy',
    description: 'Followers × Rate per post → Estimated brand income',
    icon: <Award className="w-6 h-6" />,
    inputs: [
      { name: 'followers', label: 'Followers', type: 'number', defaultValue: 125000 },
      { name: 'rate', label: 'Rate per 1k Followers ($)', type: 'number', defaultValue: 35 },
    ],
    calculate: (v) => [{ label: 'Suggested Brand Deal', value: (v.followers / 1000) * v.rate, unit: '$', formatted: 'currency' }],
    formula: 'Deal Value = (Followers / 1000) × Rate',
  },
  {
    id: 'creator-roi',
    title: 'Creator ROI Calculator',
    category: 'Creator Economy',
    description: 'Revenue vs effort/time investment',
    icon: <TrendingUp className="w-6 h-6" />,
    inputs: [
      { name: 'revenue', label: 'Monthly Revenue ($)', type: 'number', defaultValue: 8500 },
      { name: 'hours', label: 'Hours Invested', type: 'number', defaultValue: 120 },
    ],
    calculate: (v) => [{ label: 'ROI per Hour', value: v.revenue / v.hours, unit: '$/hr', formatted: 'currency' }],
    formula: 'ROI/Hour = Revenue / Hours',
  },
  {
    id: 'subscriber-growth',
    title: 'Subscriber Growth Calculator',
    category: 'Creator Economy',
    description: 'Track channel or profile growth over time',
    icon: <Users className="w-6 h-6" />,
    inputs: [
      { name: 'currentSubs', label: 'Current Subscribers', type: 'number', defaultValue: 45000 },
      { name: 'monthlyGrowth', label: 'Monthly Growth Rate (%)', type: 'number', defaultValue: 8.5, unit: '%' },
    ],
    calculate: (v) => [{ label: 'Projected in 6 Months', value: Math.round(v.currentSubs * Math.pow(1 + v.monthlyGrowth/100, 6)), unit: 'subs' }],
    formula: 'Future Subs = Current × (1 + rate)^months',
  },
  {
    id: 'video-profit',
    title: 'Video Profit Calculator',
    category: 'Creator Economy',
    description: 'Costs vs monetization → Net profit',
    icon: <DollarSign className="w-6 h-6" />,
    inputs: [
      { name: 'revenue', label: 'Video Revenue ($)', type: 'number', defaultValue: 1250 },
      { name: 'cost', label: 'Production Cost ($)', type: 'number', defaultValue: 320 },
    ],
    calculate: (v) => [{ label: 'Net Profit', value: v.revenue - v.cost, unit: '$', formatted: 'currency' }],
    formula: 'Profit = Revenue - Cost',
  },

  // Finance / Money
  {
    id: 'emi-calculator',
    title: 'EMI Calculator',
    category: 'Finance',
    description: 'Loan/credit card EMIs',
    icon: <DollarSign className="w-6 h-6" />,
    inputs: [
      { name: 'principal', label: 'Loan Amount ($)', type: 'number', defaultValue: 25000 },
      { name: 'rate', label: 'Annual Interest (%)', type: 'number', defaultValue: 9.5 },
      { name: 'time', label: 'Tenure (months)', type: 'number', defaultValue: 36 },
    ],
    calculate: (v) => {
      const r = v.rate / 1200;
      const emi = v.principal * r * Math.pow(1 + r, v.time) / (Math.pow(1 + r, v.time) - 1);
      return [{ label: 'Monthly EMI', value: emi, unit: '$', formatted: 'currency' }];
    },
    formula: 'EMI = P × r × (1+r)^n / ((1+r)^n - 1)',
  },
  {
    id: 'compound-interest',
    title: 'Compound Interest Calculator',
    category: 'Finance',
    description: 'Calculate compound growth',
    icon: <TrendingUp className="w-6 h-6" />,
    inputs: [
      { name: 'principal', label: 'Principal ($)', type: 'number', defaultValue: 10000 },
      { name: 'rate', label: 'Rate (%)', type: 'number', defaultValue: 7.5 },
      { name: 'time', label: 'Years', type: 'number', defaultValue: 10 },
    ],
    calculate: (v) => {
      const amount = v.principal * Math.pow(1 + v.rate/100, v.time);
      return [{ label: 'Final Amount', value: amount, unit: '$', formatted: 'currency' }];
    },
    formula: 'A = P × (1 + r/100)^t',
  },
  {
    id: 'sip-calculator',
    title: 'SIP Calculator',
    category: 'Finance',
    description: 'Mutual funds SIP returns',
    icon: <DollarSign className="w-6 h-6" />,
    inputs: [
      { name: 'amount', label: 'Monthly Investment ($)', type: 'number', defaultValue: 500 },
      { name: 'rate', label: 'Expected Return (%)', type: 'number', defaultValue: 12 },
      { name: 'years', label: 'Investment Years', type: 'number', defaultValue: 10 },
    ],
    calculate: (v) => {
      const months = v.years * 12;
      const r = v.rate / 1200;
      const futureValue = v.amount * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
      return [{ label: 'Maturity Value', value: futureValue, unit: '$', formatted: 'currency' }];
    },
    formula: 'Future Value of SIP',
  },
  {
    id: 'gst-calculator',
    title: 'GST Calculator',
    category: 'Finance',
    description: 'India-specific tax calculator',
    icon: <Percent className="w-6 h-6" />,
    inputs: [
      { name: 'amount', label: 'Amount ($)', type: 'number', defaultValue: 1250 },
      { name: 'rate', label: 'GST Rate (%)', type: 'number', defaultValue: 18 },
    ],
    calculate: (v) => {
      const gst = v.amount * (v.rate / 100);
      return [
        { label: 'GST Amount', value: gst, unit: '$', formatted: 'currency' },
        { label: 'Total with GST', value: v.amount + gst, unit: '$', formatted: 'currency' },
      ];
    },
    formula: 'GST = Amount × Rate / 100',
  },

  // Health additional
  {
    id: 'water-intake',
    title: 'Water Intake Calculator',
    category: 'Health & Fitness',
    description: 'Daily hydration recommendation',
    icon: <Heart className="w-6 h-6" />,
    inputs: [
      { name: 'weight', label: 'Body Weight (kg)', type: 'number', defaultValue: 75 },
    ],
    calculate: (v) => [{ label: 'Daily Water', value: Math.round(v.weight * 0.033 * 100) / 100, unit: 'Liters' }],
    formula: 'Liters = Weight(kg) × 0.033',
  },
  {
    id: 'ideal-weight',
    title: 'Ideal Weight Calculator',
    category: 'Health & Fitness',
    description: 'Gender-specific ideal weight',
    icon: <Scale className="w-6 h-6" />,
    inputs: [
      { name: 'height', label: 'Height (cm)', type: 'number', defaultValue: 170 },
      { name: 'gender', label: 'Gender (1=Male)', type: 'number', defaultValue: 1 },
    ],
    calculate: (v) => {
      const iw = v.gender === 1 ? (v.height - 100) * 0.9 : (v.height - 100) * 0.85;
      return [{ label: 'Ideal Weight', value: iw.toFixed(1), unit: 'kg' }];
    },
    formula: 'Devine Formula',
  },

  // Math / Science
  {
    id: 'age-calculator',
    title: 'Age Calculator',
    category: 'Math & Science',
    description: 'Birthdate to current age',
    icon: <Clock className="w-6 h-6" />, // Note: Clock was removed but added back if needed
    inputs: [
      { name: 'birthYear', label: 'Birth Year', type: 'number', defaultValue: 1995 },
    ],
    calculate: (v) => [{ label: 'Current Age', value: new Date().getFullYear() - v.birthYear }],
    formula: 'Age = Current Year - Birth Year',
  },
  {
    id: 'unit-converter',
    title: 'Unit Converter',
    category: 'Math & Science',
    description: 'Length, weight, volume, speed',
    icon: <BarChart3 className="w-6 h-6" />,
    inputs: [
      { name: 'value', label: 'Value', type: 'number', defaultValue: 100 },
      { name: 'fromUnit', label: 'From (1=cm to m)', type: 'number', defaultValue: 1 },
    ],
    calculate: (v) => [{ label: 'Converted', value: v.fromUnit === 1 ? v.value / 100 : v.value * 100, unit: 'result' }],
    formula: 'Simple Unit Conversion',
  },

  // Business / Lifestyle
  {
    id: 'break-even-business',
    title: 'Break-even Calculator',
    category: 'Business Tools',
    description: 'Businesses break even point',
    icon: <Target className="w-6 h-6" />,
    inputs: [
      { name: 'fixed', label: 'Fixed Costs ($)', type: 'number', defaultValue: 12500 },
      { name: 'price', label: 'Price per Unit', type: 'number', defaultValue: 85 },
      { name: 'var', label: 'Variable Cost', type: 'number', defaultValue: 35 },
    ],
    calculate: (v) => [{ label: 'Break Even Units', value: Math.ceil(v.fixed / (v.price - v.var)) }],
    formula: 'Units = Fixed Costs / (Price - Variable)',
  },
  {
    id: 'retirement-calculator',
    title: 'Retirement Calculator',
    category: 'Business Tools',
    description: 'Age & savings plan',
    icon: <DollarSign className="w-6 h-6" />,
    inputs: [
      { name: 'currentAge', label: 'Current Age', type: 'number', defaultValue: 32 },
      { name: 'saveMonthly', label: 'Monthly Savings ($)', type: 'number', defaultValue: 1200 },
    ],
    calculate: (v) => [{ label: 'At Age 65 (approx)', value: Math.round(v.saveMonthly * 12 * (65 - v.currentAge) * 1.8), unit: '$' }],
    formula: 'Projected Savings',
  },
  {
    id: 'trip-cost',
    title: 'Trip Cost Calculator',
    category: 'Lifestyle',
    description: 'Fuel + tolls + hotel',
    icon: <Clock className="w-6 h-6" />,
    inputs: [
      { name: 'distance', label: 'Distance (km)', type: 'number', defaultValue: 650 },
      { name: 'fuelPrice', label: 'Fuel Price per L', type: 'number', defaultValue: 1.45 },
    ],
    calculate: (v) => [{ label: 'Estimated Trip Cost', value: v.distance * 0.08 * v.fuelPrice + 240, unit: '$', formatted: 'currency' }],
    formula: 'Fuel Cost + Fixed',
  },
  {
    id: 'carpet-paint',
    title: 'Carpet / Paint Calculator',
    category: 'Lifestyle',
    description: 'Area coverage for carpet or paint',
    icon: <Scale className="w-6 h-6" />,
    inputs: [
      { name: 'length', label: 'Length (m)', type: 'number', defaultValue: 5.5 },
      { name: 'width', label: 'Width (m)', type: 'number', defaultValue: 4 },
    ],
    calculate: (v) => [{ label: 'Area', value: v.length * v.width, unit: 'm²' }, { label: 'Paint Needed (approx)', value: Math.ceil((v.length * v.width) / 12), unit: 'liters' }],
    formula: 'Area = Length × Width',
  },
  {
    id: 'room-dimension',
    title: 'Room Dimension Calculator',
    category: 'Lifestyle',
    description: 'Furniture fit and room planning',
    icon: <Scale className="w-6 h-6" />,
    inputs: [
      { name: 'length', label: 'Room Length (ft)', type: 'number', defaultValue: 14 },
      { name: 'width', label: 'Room Width (ft)', type: 'number', defaultValue: 12 },
    ],
    calculate: (v) => [{ label: 'Floor Area', value: v.length * v.width, unit: 'sq ft' }, { label: 'Perimeter', value: 2 * (v.length + v.width), unit: 'ft' }],
    formula: 'Area = L × W | Perimeter = 2(L + W)',
  },
  {
    id: 'land-area',
    title: 'Land Area Converter',
    category: 'Lifestyle',
    description: 'sq ft, sq m, acres converter',
    icon: <Scale className="w-6 h-6" />,
    inputs: [
      { name: 'value', label: 'Area in sq ft', type: 'number', defaultValue: 43560 },
    ],
    calculate: (v) => [
      { label: 'Square Meters', value: (v.value * 0.092903).toFixed(2) },
      { label: 'Acres', value: (v.value / 43560).toFixed(3) },
    ],
    formula: '1 sq ft = 0.0929 m² | 1 acre = 43560 sq ft',
  },
  {
    id: 'tyre-pressure',
    title: 'Tyre Pressure / Car Maintenance Calculator',
    category: 'Lifestyle',
    description: 'Optimal tyre pressure and maintenance',
    icon: <Clock className="w-6 h-6" />,
    inputs: [
      { name: 'vehicleWeight', label: 'Vehicle Weight (kg)', type: 'number', defaultValue: 1450 },
    ],
    calculate: (v) => [{ label: 'Recommended PSI', value: Math.round(28 + v.vehicleWeight / 70), unit: 'PSI' }],
    formula: 'PSI Recommendation based on weight',
  },
  {
    id: 'currency-traveler',
    title: 'Currency Conversion for Travelers',
    category: 'Lifestyle',
    description: 'Forex conversions for trips',
    icon: <DollarSign className="w-6 h-6" />,
    inputs: [
      { name: 'amount', label: 'Amount in USD', type: 'number', defaultValue: 1500 },
      { name: 'rate', label: 'Exchange Rate', type: 'number', defaultValue: 0.92 },
    ],
    calculate: (v) => [{ label: 'Converted Amount', value: v.amount * v.rate, unit: 'EUR' }],
    formula: 'Converted = Amount × Rate',
  },
  // Additional Business Tools
  {
    id: 'price-comparison',
    title: 'Price Comparison Calculator',
    category: 'Business Tools',
    description: 'Compare products',
    icon: <DollarSign className="w-6 h-6" />,
    inputs: [
      { name: 'price1', label: 'Price 1 ($)', type: 'number', defaultValue: 29.99 },
      { name: 'price2', label: 'Price 2 ($)', type: 'number', defaultValue: 34.99 },
    ],
    calculate: (v) => [{ label: 'Savings', value: Math.abs(v.price1 - v.price2), unit: '$', formatted: 'currency' }],
    formula: 'Savings = |Price1 - Price2|',
  },
  {
    id: 'hidden-cost',
    title: 'Hidden Cost Calculator',
    category: 'Business Tools',
    description: 'Extra taxes/fees',
    icon: <Percent className="w-6 h-6" />,
    inputs: [
      { name: 'base', label: 'Base Price ($)', type: 'number', defaultValue: 999 },
      { name: 'tax', label: 'Tax %', type: 'number', defaultValue: 8.5 },
      { name: 'fee', label: 'Extra Fees ($)', type: 'number', defaultValue: 45 },
    ],
    calculate: (v) => {
      const total = v.base * (1 + v.tax/100) + v.fee;
      return [{ label: 'Total with Hidden Costs', value: total, unit: '$', formatted: 'currency' }];
    },
    formula: 'Total = Base × (1 + Tax/100) + Fees',
  },
  {
    id: 'website-roi',
    title: 'Website ROI Calculator',
    category: 'Business Tools',
    description: 'Ads revenue vs cost',
    icon: <TrendingUp className="w-6 h-6" />,
    inputs: [
      { name: 'revenue', label: 'Ad Revenue ($)', type: 'number', defaultValue: 4200 },
      { name: 'cost', label: 'Website Cost ($)', type: 'number', defaultValue: 1250 },
    ],
    calculate: (v) => [{ label: 'ROI', value: ((v.revenue - v.cost) / v.cost) * 100, unit: '%', formatted: 'percent' }],
    formula: 'ROI = ((Revenue - Cost) / Cost) × 100',
  },

  // Additional Math & Science
  {
    id: 'percentage-exams',
    title: 'Percentage Calculator',
    category: 'Math & Science',
    description: 'Exams, grades',
    icon: <Percent className="w-6 h-6" />,
    inputs: [
      { name: 'part', label: 'Part', type: 'number', defaultValue: 87 },
      { name: 'whole', label: 'Whole', type: 'number', defaultValue: 120 },
    ],
    calculate: (v) => [{ label: 'Percentage', value: (v.part / v.whole) * 100, unit: '%', formatted: 'percent' }],
    formula: 'Percentage = (Part / Whole) × 100',
  },
  {
    id: 'time-date-diff',
    title: 'Time / Date Calculator',
    category: 'Math & Science',
    description: 'Difference between dates',
    icon: <Clock className="w-6 h-6" />,
    inputs: [
      { name: 'start', label: 'Start Day', type: 'number', defaultValue: 1 },
      { name: 'end', label: 'End Day', type: 'number', defaultValue: 15 },
    ],
    calculate: (v) => [{ label: 'Days Difference', value: Math.abs(v.end - v.start) }],
    formula: 'Difference = |End - Start|',
  },
  {
    id: 'scientific-calc',
    title: 'Scientific Calculator',
    category: 'Math & Science',
    description: 'Trig, log, sqrt',
    icon: <BarChart3 className="w-6 h-6" />,
    inputs: [
      { name: 'value', label: 'Value', type: 'number', defaultValue: 45 },
      { name: 'operation', label: 'Op (1=sin,2=log,3=sqrt)', type: 'number', defaultValue: 3 },
    ],
    calculate: (v) => {
      let res = 0;
      if (v.operation === 1) res = Math.sin(v.value * Math.PI / 180);
      else if (v.operation === 2) res = Math.log10(v.value);
      else res = Math.sqrt(v.value);
      return [{ label: 'Result', value: res.toFixed(4) }];
    },
    formula: 'Supports sin, log10, sqrt',
  },
  {
    id: 'temp-converter',
    title: 'Temperature Converter',
    category: 'Math & Science',
    description: 'Celsius, Fahrenheit, Kelvin',
    icon: <Scale className="w-6 h-6" />,
    inputs: [
      { name: 'celsius', label: 'Celsius', type: 'number', defaultValue: 25 },
    ],
    calculate: (v) => [
      { label: 'Fahrenheit', value: (v.celsius * 9/5 + 32).toFixed(1) },
      { label: 'Kelvin', value: (v.celsius + 273.15).toFixed(2) },
    ],
    formula: 'F = C×9/5+32 | K = C+273.15',
  },

  // Additional Health & Fitness
  {
    id: 'pregnancy-due',
    title: 'Pregnancy Due Date Calculator',
    category: 'Health & Fitness',
    description: 'Estimated due date',
    icon: <Heart className="w-6 h-6" />,
    inputs: [
      { name: 'lmp', label: 'LMP Week', type: 'number', defaultValue: 0 },
    ],
    calculate: (v) => [{ label: 'Due Date (weeks from now)', value: 40 - v.lmp }],
    formula: '40 weeks from LMP',
  },
  {
    id: 'heart-rate',
    title: 'Heart Rate / Target Heart Rate Calculator',
    category: 'Health & Fitness',
    description: 'Target heart rate zones',
    icon: <Heart className="w-6 h-6" />,
    inputs: [
      { name: 'age', label: 'Age', type: 'number', defaultValue: 30 },
    ],
    calculate: (v) => {
      const max = 220 - v.age;
      return [
        { label: 'Max HR', value: max },
        { label: 'Target Zone (60-80%)', value: Math.round(max * 0.6) + '-' + Math.round(max * 0.8) },
      ];
    },
    formula: 'Max HR = 220 - Age',
  },
];

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How Much Do YouTubers Really Earn in 2025?',
    excerpt: 'Deep dive into the real numbers behind YouTube monetization and how to scale your channel income.',
    category: 'Creator Economy',
    readTime: '12 min',
    content: 'YouTube has changed dramatically. Top creators are making 6 and 7 figures but the median creator earns much less. The secret is diversification: affiliate income, digital products, sponsorships...',
    image: '/hero.jpg',
  },
  {
    id: '2',
    title: 'The Ultimate Guide to CPM Rates by Niche',
    excerpt: 'Discover which content niches command the highest CPM rates and how to optimize your content for maximum revenue.',
    category: 'Finance',
    readTime: '8 min',
    content: 'Finance, insurance and B2B niches often pay $20-$40 CPM while gaming and vlogs are typically $2-$6. Here are proven strategies to increase your CPM...',
  },
  {
    id: '3',
    title: 'How to Price Your First Influencer Sponsorship',
    excerpt: 'Learn the exact formula top creators use to price brand deals and never leave money on the table again.',
    category: 'Business Tools',
    readTime: '15 min',
    content: 'The industry standard is $0.01-$0.05 per follower but engagement rate and audience quality matter more. Use our rate calculator to get a fair price.',
  },
  {
    id: '4',
    title: 'Maximizing Affiliate Income as a Content Creator',
    excerpt: 'Proven strategies to turn your audience into recurring revenue through smart affiliate marketing.',
    category: 'Creator Economy',
    readTime: '10 min',
    content: 'The best converting affiliate programs for creators and how to ethically integrate them into your content.',
  },
  {
    id: '5',
    title: '10 Ways to Increase Your Instagram Engagement Rate',
    excerpt: 'Tactical advice that actually works in the current algorithm to boost your reach and brand deals.',
    category: 'Health & Fitness',
    readTime: '7 min',
    content: 'From carousel posts to optimal posting times and storytelling techniques that keep people watching.',
  },
];

const categories = ['All', 'Creator Economy', 'Finance', 'Health & Fitness', 'Math & Science', 'Business Tools', 'Lifestyle'];

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCalculator, setSelectedCalculator] = useState<CalculatorType | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [inputValues, setInputValues] = useState<Record<string, number>>({});
  const [calcResults, setCalcResults] = useState<CalculationResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState<'calculators' | 'blog' | 'resources'>('calculators');

  const filteredCalculators = useMemo(() => {
    return calculators.filter(calc => {
      const matchesCategory = activeCategory === 'All' || calc.category === activeCategory;
      const matchesSearch = searchTerm === '' || 
        calc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        calc.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const handleCalculatorClick = (calc: CalculatorType) => {
    setSelectedCalculator(calc);
    // Initialize input values
    const initialValues: Record<string, number> = {};
    calc.inputs.forEach(input => {
      initialValues[input.name] = input.defaultValue;
    });
    setInputValues(initialValues);
    setCalcResults([]);
    setShowResults(false);
  };

  const handleInputChange = (name: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputValues(prev => ({ ...prev, [name]: numValue }));
  };

  const calculateResults = () => {
    if (!selectedCalculator) return;
    
    const results = selectedCalculator.calculate(inputValues);
    setCalcResults(results);
    setShowResults(true);
  };

  const resetCalculator = () => {
    if (!selectedCalculator) return;
    const initialValues: Record<string, number> = {};
    selectedCalculator.inputs.forEach(input => {
      initialValues[input.name] = input.defaultValue;
    });
    setInputValues(initialValues);
    setCalcResults([]);
    setShowResults(false);
  };

  const formatValue = (result: CalculationResult) => {
    if (result.formatted === 'currency') {
      return '$' + Number(result.value).toFixed(2);
    }
    if (result.formatted === 'percent') {
      return Number(result.value).toFixed(2) + '%';
    }
    return typeof result.value === 'number' 
      ? result.value.toLocaleString() 
      : result.value;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="bg-black/80 backdrop-blur-lg border-b border-zinc-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl font-bold tracking-tighter">creatorprofitlab</div>
              <div className="text-[10px] text-zinc-500 -mt-1">MONETIZE • CALCULATE • GROW</div>
            </div>
          </div>

          <div className="flex items-center gap-x-8 text-sm uppercase tracking-widest font-medium">
            <button 
              onClick={() => { setActiveTab('calculators'); setActiveCategory('All'); }}
              className={`hover:text-violet-400 transition-colors ${activeTab === 'calculators' ? 'text-white' : 'text-zinc-400'}`}
            >
              CALCULATORS
            </button>
            <button 
              onClick={() => setActiveTab('blog')}
              className={`hover:text-violet-400 transition-colors flex items-center gap-x-1.5 ${activeTab === 'blog' ? 'text-white' : 'text-zinc-400'}`}
            >
              <BookOpen className="w-4 h-4" /> BLOG
            </button>
            <a href="#about" className="text-zinc-400 hover:text-white transition-colors">ABOUT</a>
          </div>

          <div className="flex items-center gap-x-4">
            <div className="bg-zinc-900 text-xs px-4 py-2 rounded-3xl border border-zinc-700 flex items-center gap-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              54,291 creators online
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div className="relative h-[580px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#27272a_0.8px,transparent_1px)] bg-[length:4px_4px]"></div>
        
        <img 
          src="/hero.jpg" 
          alt="Creator Profit Lab" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/90 to-zinc-950"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-x-2 bg-white/10 text-white text-xs tracking-[3px] px-6 py-3 rounded-3xl mb-6 border border-white/10">
              <span className="text-emerald-400">●</span> POWERING 50,000+ CREATORS
            </div>
            
            <h1 className="text-7xl font-bold tracking-tighter leading-none mb-6">
              CALCULATE YOUR<br />CREATOR PROFITS
            </h1>
            
            <p className="max-w-md mx-auto text-xl text-zinc-400 mb-10">
              75+ free calculators to help you understand, optimize and grow your creator income.
            </p>
          </motion.div>

          <div className="max-w-xl mx-auto relative">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search calculators... e.g. youtube earnings, bmi"
              className="w-full bg-zinc-900 border border-zinc-700 focus:border-violet-500 transition-colors pl-14 pr-6 py-6 rounded-3xl text-lg placeholder:text-zinc-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex justify-center gap-x-8 mt-8 text-xs uppercase tracking-widest text-zinc-400">
            <div>Trusted by MrBeast Team • Ali Abdaal • Marques Brownlee</div>
          </div>
        </div>

        {/* Fake AdSense banner */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-zinc-900/90 text-[10px] px-5 py-2.5 border border-amber-400/30 text-amber-400/80 flex items-center gap-x-3 rounded">
          <div className="px-2.5 py-px bg-amber-400 text-amber-950 text-[9px] font-mono tracking-widest">AD</div>
          Want to earn more? Join the Creator Profit Accelerator — 30 day challenge
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        {/* TABS */}
        <div className="flex border-b border-zinc-800 mb-8">
          <button 
            onClick={() => setActiveTab('calculators')}
            className={`px-10 py-5 text-sm tracking-widest font-medium transition-all border-b-2 ${activeTab === 'calculators' ? 'border-violet-500 text-white' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}
          >
            CALCULATORS
          </button>
          <button 
            onClick={() => setActiveTab('blog')}
            className={`px-10 py-5 text-sm tracking-widest font-medium transition-all border-b-2 ${activeTab === 'blog' ? 'border-violet-500 text-white' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}
          >
            BLOG &amp; GUIDES
          </button>
          <button 
            onClick={() => setActiveTab('resources')}
            className={`px-10 py-5 text-sm tracking-widest font-medium transition-all border-b-2 ${activeTab === 'resources' ? 'border-violet-500 text-white' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}
          >
            RESOURCES
          </button>
        </div>

        {activeTab === 'calculators' && (
          <>
            {/* CATEGORY TABS */}
            <div className="flex flex-wrap gap-x-2 mb-10">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setSearchTerm('');
                  }}
                  className={`px-7 py-2.5 text-sm transition-all rounded-3xl whitespace-nowrap ${activeCategory === cat 
                    ? 'bg-white text-black font-semibold' 
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* CALCULATORS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCalculators.length > 0 ? (
                filteredCalculators.map((calc, index) => (
                  <motion.div
                    key={calc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.025, 0.6) }}
                    onClick={() => handleCalculatorClick(calc)}
                    className="group bg-zinc-900 hover:bg-zinc-800/90 border border-zinc-800 hover:border-violet-500/50 rounded-3xl p-8 cursor-pointer transition-all duration-300 flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                        {calc.icon}
                      </div>
                      <div className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 bg-zinc-950 rounded-xl text-zinc-500 self-start">
                        {calc.category}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-semibold tracking-tight mb-3 group-hover:text-violet-300 transition-colors">
                      {calc.title}
                    </h3>
                    <p className="text-zinc-400 text-[15px] line-clamp-3 flex-1">
                      {calc.description}
                    </p>
                    
                    <div className="pt-8 mt-auto border-t border-zinc-800 text-xs flex items-center justify-between text-zinc-500">
                      <div className="flex items-center gap-x-1">
                        <div className="w-px h-3 bg-violet-500"></div> 
                        CALCULATE
                      </div>
                      <ArrowUp className="w-4 h-4 group-hover:rotate-45 transition" />
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-2xl text-zinc-400">No calculators found.</p>
                  <button onClick={() => {setSearchTerm(''); setActiveCategory('All');}} className="mt-4 underline">Clear search</button>
                </div>
              )}
            </div>

            {/* SIDEBAR ADS */}
            <div className="mt-16 grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-7">
                <div className="border border-dashed border-zinc-700 bg-zinc-900/50 rounded-3xl p-8 text-center">
                  <div className="text-amber-400 text-xs tracking-[1.5px] mb-2 font-mono">SPONSORSHIP OPPORTUNITY</div>
                  <div className="text-3xl font-medium text-white/90">Promote your creator tool or course here</div>
                  <div className="text-zinc-400 mt-4">Reach 50k+ monthly visitors who are serious about creator income</div>
                  <a href="#" className="inline-block mt-6 text-xs border border-white/60 hover:bg-white hover:text-black px-8 py-3.5 rounded-2xl transition">GET IN TOUCH →</a>
                </div>
              </div>
              
              <div className="col-span-12 lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-center">
                <div className="uppercase text-xs opacity-60 mb-6 tracking-widest">Featured Tool</div>
                <div className="text-4xl leading-none font-semibold tracking-tighter">Want to 10x your income?</div>
                <div className="mt-8 text-emerald-400 flex items-center gap-x-2 text-sm">
                  <div className="h-px w-8 bg-current"></div> 
                  START FREE TRIAL
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'blog' && (
          <div>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-6xl font-bold tracking-tighter mb-4">Creator Income Guides</h2>
              <p className="text-xl text-zinc-400">Real data. Actionable advice. Zero fluff.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mt-16">
              {blogPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedBlog(post)}
                  className="group bg-zinc-900 rounded-3xl overflow-hidden border border-transparent hover:border-white/10 cursor-pointer"
                >
                  <div className="h-64 bg-zinc-800 relative">
                    <img src={post.image || "/hero.jpg"} alt={post.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-6 right-6 bg-black/70 text-xs px-4 py-1 rounded-3xl backdrop-blur">{post.readTime}</div>
                  </div>
                  <div className="p-9">
                    <div className="uppercase text-[10px] tracking-[1px] text-violet-400 mb-4">{post.category}</div>
                    <h4 className="text-3xl font-semibold leading-tight tracking-tight mb-6 line-clamp-3 group-hover:text-violet-300 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-zinc-400 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex items-center gap-x-3 text-xs mt-8 pt-8 border-t border-white/5 text-zinc-500">
                      <div>BY CREATOR PROFIT LAB</div>
                      <div className="flex-1 h-px bg-white/10"></div>
                      <button className="hover:text-white">READ ARTICLE →</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="max-w-4xl mx-auto py-12">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-x-2 bg-white/10 px-6 py-2 rounded-3xl text-xs tracking-widest mb-6">RESOURCES</div>
              <h2 className="text-6xl font-bold tracking-tighter mb-6">Contact &amp; Privacy</h2>
              <p className="max-w-md mx-auto text-xl text-zinc-400">Empowering creators to turn passion into sustainable profit with precision tools and transparent data practices.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-zinc-900 rounded-3xl p-12 border border-zinc-700">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8">
                  <DollarSign className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-4xl font-semibold tracking-tight mb-4">Get in Touch</h3>
                <a href="mailto:hello@creatorprofitlab.com" className="block text-4xl font-mono text-violet-400 hover:text-violet-300 mb-6 transition">hello@creatorprofitlab.com</a>
                <p className="text-zinc-400">Questions about calculators or partnership opportunities? Our team typically replies within 24-48 hours.</p>
                <div className="mt-12 text-xs uppercase tracking-widest border-t border-white/10 pt-8 text-emerald-400">54,291 creators online • Scaling their income with data</div>
              </div>

              <div className="bg-zinc-900 rounded-3xl p-12 border border-zinc-700">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-4xl font-semibold tracking-tight mb-4">Privacy Policy</h3>
                <div className="text-sm leading-relaxed text-zinc-400 space-y-6">
                  <p>All calculations happen directly in your browser. We do not collect, store, or share any of your input data.</p>
                  <p>We use completely anonymous usage analytics to understand which calculators are most helpful. No personal tracking or cookies for advertising.</p>
                  <p className="text-emerald-400 pt-4">Your data privacy is our top priority. Last updated January 2025.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* FOOTER / SITEMAP */}
      <footer className="bg-black pt-20 pb-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-y-14">
          <div>
            <div className="flex items-center gap-x-3 mb-6">
              <div className="w-8 h-8 bg-white text-black rounded-2xl flex items-center justify-center text-xl font-black">C</div>
              <div className="font-semibold text-2xl tracking-tight">creatorprofitlab</div>
            </div>
            <div className="text-xs text-zinc-500 leading-relaxed">
              The largest free calculator resource<br />for content creators and online entrepreneurs.
            </div>
            <div className="mt-8 text-[10px] text-zinc-600">© 2025 • ALL RIGHTS RESERVED</div>
          </div>

          <div>
            <div className="uppercase text-xs mb-6 tracking-widest text-zinc-500">PRODUCTS</div>
            <div className="space-y-3 text-sm">
              {categories.slice(1).map(c => (
                <div key={c} className="cursor-pointer hover:text-white transition" onClick={() => {setActiveTab('calculators'); setActiveCategory(c);}}>
                  {c}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="uppercase text-xs mb-6 tracking-widest text-zinc-500">RESOURCES</div>
            <div className="space-y-3 text-sm text-zinc-400">
              <div className="cursor-pointer hover:text-white transition" onClick={() => setActiveTab('blog')}>Blog</div>
              <div className="cursor-pointer hover:text-white transition">Creator Rates 2025</div>
              <div className="cursor-pointer hover:text-white transition">YouTube RPM Report</div>
              <div className="cursor-pointer hover:text-white transition">Free Notion Templates</div>
            </div>
          </div>

          <div>
            <div className="uppercase text-xs mb-6 tracking-widest text-zinc-500">COMPANY</div>
            <div className="space-y-3 text-sm text-zinc-400">
              <div>About Us</div>
              <div>Contact</div>
              <div>Press</div>
              <div>Advertise</div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-zinc-900 p-6 rounded-3xl text-xs">
              This website contains 75+ free calculators.<br /><br />
              Built for creators who want to understand their numbers.
              <div className="mt-8 pt-8 border-t border-white/10 text-[10px] text-emerald-300">
                TARGETING 70,000 MONTHLY VISITS
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-zinc-500 mt-24">
          For demonstration purposes only. All calculators are for educational use.
        </div>
      </footer>

      {/* CALCULATOR MODAL */}
      <AnimatePresence>
        {selectedCalculator && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-6" onClick={() => setSelectedCalculator(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 30 }}
              transition={{ type: "spring", bounce: 0.02, duration: 0.4 }}
              className="bg-zinc-900 w-full max-w-2xl rounded-3xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="px-10 pt-8 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-x-4">
                    <div className="text-violet-400">
                      {selectedCalculator.icon}
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-violet-400">{selectedCalculator.category}</div>
                      <h2 className="text-4xl font-semibold tracking-tighter pr-8">{selectedCalculator.title}</h2>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCalculator(null)}
                  className="w-11 h-11 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 rounded-2xl transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-10 mt-2 text-zinc-400 text-[15px]">
                {selectedCalculator.description}
              </div>

              <div className="mt-8 px-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {selectedCalculator.inputs.map((input, idx) => (
                    <div key={idx}>
                      <label className="block text-xs tracking-widest mb-2 text-zinc-400">{input.label}</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={inputValues[input.name] || ''}
                          onChange={(e) => handleInputChange(input.name, e.target.value)}
                          className="w-full bg-black border border-zinc-700 focus:border-white h-14 rounded-2xl px-6 text-2xl outline-none transition"
                          min={input.min}
                          max={input.max}
                        />
                        {input.unit && (
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-sm text-zinc-400 pointer-events-none">
                            {input.unit}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-x-4 px-10 mt-10">
                <button 
                  onClick={calculateResults}
                  className="flex-1 bg-white text-black h-16 rounded-2xl text-lg font-semibold active:scale-[0.985] transition flex items-center justify-center gap-x-3 hover:bg-zinc-100"
                >
                  CALCULATE NOW
                  <Zap className="w-5 h-5" />
                </button>
                
                <button 
                  onClick={resetCalculator}
                  className="px-9 border border-zinc-700 rounded-2xl text-sm tracking-widest hover:bg-zinc-950"
                >
                  RESET
                </button>
              </div>

              <AnimatePresence>
                {showResults && calcResults.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mx-10 mt-8 bg-black rounded-3xl p-8 border border-zinc-800"
                  >
                    <div className="uppercase text-xs text-emerald-400 mb-6 tracking-[2px]">RESULTS</div>
                    
                    <div className="space-y-6">
                      {calcResults.map((res, index) => (
                        <div key={index} className="flex justify-between items-end border-b border-white/10 pb-6 last:border-none last:pb-0">
                          <div className="text-zinc-400">{res.label}</div>
                          <div className="text-right">
                            <div className="text-5xl font-semibold tabular-nums tracking-tighter text-white">
                              {formatValue(res)}
                            </div>
                            {res.unit && !['%','$'].includes(res.unit) && <div className="text-xs text-zinc-500">{res.unit}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* FORMULA */}
              <div className="m-10 bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-sm">
                <div className="font-mono text-xs mb-3 tracking-[1px] text-zinc-500">FORMULA USED</div>
                <div className="font-medium text-violet-300 text-lg">{selectedCalculator.formula}</div>
                {selectedCalculator.formulaExplanation && (
                  <div className="mt-6 text-xs leading-relaxed text-zinc-400 border-l-2 border-zinc-700 pl-4">
                    {selectedCalculator.formulaExplanation}
                  </div>
                )}
              </div>

              <div className="text-center py-8 text-xs text-zinc-500 border-t border-zinc-800">
                Results are estimates. Always verify with your actual analytics.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BLOG MODAL */}
      <AnimatePresence>
        {selectedBlog && (
          <div 
            className="fixed inset-0 bg-zinc-950/95 z-[110] flex items-center justify-center p-6" 
            onClick={() => setSelectedBlog(null)}
          >
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="max-w-3xl w-full bg-zinc-900 rounded-3xl max-h-[86vh] overflow-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="-mt-px">
                <img src={selectedBlog.image || "/hero.jpg"} alt="" className="w-full h-80 object-cover rounded-t-3xl" />
              </div>

              <div className="px-12 pt-12 pb-16">
                <div className="flex justify-between">
                  <div className="text-xs uppercase font-mono tracking-widest bg-zinc-800 w-fit px-4 py-2 rounded-3xl">{selectedBlog.category}</div>
                  <div onClick={() => setSelectedBlog(null)} className="cursor-pointer">
                    <X />
                  </div>
                </div>

                <h1 className="text-5xl font-semibold tracking-[-1.5px] leading-none mt-7 mb-6">{selectedBlog.title}</h1>
                
                <div className="flex items-center gap-x-4 text-sm text-zinc-400">
                  <div>Creator Profit Lab Editorial</div>
                  <div>·</div>
                  <div>{selectedBlog.readTime} read</div>
                </div>

                <div className="prose prose-invert mt-14 text-lg leading-relaxed text-zinc-300">
                  {selectedBlog.content}
                  <p className="mt-8">In this article we explore multiple proven tactics used by the top 1% of creators to scale their businesses to six and seven figures.</p>
                  <p>Key takeaway: Focus on building an owned audience and multiple revenue streams rather than depending on a single platform.</p>
                  
                  <div className="not-italic border-l-4 border-violet-500 pl-7 py-1 my-10 text-xl">
                    "The creators winning today are the ones who treat content as a business — not a hobby."
                  </div>
                </div>

                <div className="bg-black mt-16 p-8 rounded-3xl text-center">
                  <div className="text-sm mb-2 text-emerald-400">SHARE THIS GUIDE</div>
                  <div className="text-2xl">Help other creators by sharing on Twitter and LinkedIn</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FLOATING ACTION */}
      <div 
        onClick={() => {
          setActiveTab('calculators');
          setActiveCategory('All');
          window.scrollTo({ top: 600, behavior: 'smooth' });
        }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-violet-600 hover:bg-violet-500 transition-all shadow-2xl rounded-full flex items-center justify-center cursor-pointer z-50 active:scale-95"
      >
        <Calculator className="w-8 h-8" />
      </div>
    </div>
  );
}

export default App;

