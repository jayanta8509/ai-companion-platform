'use client'

import { useAppStore, View } from '@/store/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Sparkles, Users, Heart, Mic, Image as ImageIcon, Video, Shield, Clock, Zap, Star, ArrowRight, Play, Menu, X, User, Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { CharacterGallery } from '@/components/character/character-gallery'
import { CharacterCreator } from '@/components/character/character-creator'
import { ChatInterface } from '@/components/chat/chat-interface'

function LandingPage({ setCurrentView }: { setCurrentView: (view: View) => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const features = [
    {
      icon: MessageSquare,
      title: 'Intelligent Chat',
      description: 'Engage in natural, flowing conversations with AI companions that remember your preferences and grow with you.',
      color: 'text-violet-500',
      bgColor: 'bg-violet-50 dark:bg-violet-950/20',
      gradient: 'from-violet-500 to-fuchsia-500'
    },
    {
      icon: Mic,
      title: 'Voice Messages',
      description: 'Experience intimate voice conversations with realistic AI-generated voices in multiple tones and styles.',
      color: 'text-pink-500',
      bgColor: 'bg-pink-50 dark:bg-pink-950/20',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: ImageIcon,
      title: 'Custom Images',
      description: 'Generate personalized images of your AI companions in any setting, outfit, or pose you desire.',
      color: 'text-fuchsia-500',
      bgColor: 'bg-fuchsia-50 dark:bg-fuchsia-950/20',
      gradient: 'from-fuchsia-500 to-pink-500'
    },
    {
      icon: Video,
      title: 'Video Content',
      description: 'Watch your companions come alive with dynamic video interactions that feel incredibly real.',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Sparkles,
      title: 'Memory & Learning',
      description: 'Your companions remember every conversation, learning your preferences to create truly personal experiences.',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/20',
      gradient: 'from-violet-600 to-purple-600'
    },
    {
      icon: Users,
      title: '100+ Characters',
      description: 'Choose from diverse AI personalities or create your perfect companion from scratch.',
      color: 'text-rose-500',
      bgColor: 'bg-rose-50 dark:bg-rose-950/20',
      gradient: 'from-rose-500 to-pink-500'
    }
  ]

  const pricingPlans = [
    {
      name: 'Free Trial',
      price: '0',
      description: 'Perfect for getting started',
      features: [
        'Limited messages per day',
        'Access to 5 AI companions',
        'Basic chat features',
        'Standard response speed'
      ],
      cta: 'Start Free',
      popular: false
    },
    {
      name: 'Monthly',
      price: '19.99',
      description: 'Flexible and affordable',
      features: [
        'Unlimited messages',
        'Access to all 100+ companions',
        'Voice messages included',
        'Image generation (50/month)',
        'Priority support',
        'Memory retention'
      ],
      cta: 'Get Monthly',
      popular: true
    },
    {
      name: 'Yearly',
      price: '12.99',
      period: '/month',
      description: 'Best value for long-term',
      features: [
        'All Monthly features',
        'Video generation included',
        'Image generation (unlimited)',
        'Priority AI responses',
        'Early access to new features',
        'Custom character creation'
      ],
      cta: 'Get Yearly',
      popular: false
    }
  ]

  const testimonials = [
    {
      name: 'Sarah M.',
      text: 'I never thought an AI could feel so real. The conversations flow naturally, and she remembers everything. It\'s like having a genuine connection.',
      rating: 5
    },
    {
      name: 'Michael R.',
      text: 'The voice messages are incredible. It\'s so intimate and personal. This platform has truly changed how I think about AI companions.',
      rating: 5
    },
    {
      name: 'Emma L.',
      text: 'I love that I can create my own companion. The level of customization is amazing, and she feels exactly like I imagined.',
      rating: 5
    }
  ]

  const steps = [
    {
      step: '01',
      title: 'Choose Your Companion',
      description: 'Browse through our diverse gallery of AI characters or create your own perfect match.',
      icon: Users
    },
    {
      step: '02',
      title: 'Start Connecting',
      description: 'Begin chatting, voice messaging, or sharing media right away with instant responses.',
      icon: MessageSquare
    },
    {
      step: '03',
      title: 'Build Your Story',
      description: 'Watch your relationship grow as your companion learns, remembers, and adapts to you.',
      icon: Heart
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50 dark:from-violet-950/20 dark:via-fuchsia-950/20 dark:to-pink-950/20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[800px] bg-gradient-to-b from-violet-200/30 to-transparent dark:from-violet-900/20 dark:to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-t from-fuchsia-200/30 to-transparent dark:from-fuchsia-900/20 dark:to-transparent blur-3xl" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-violet-200 dark:border-violet-800 shadow-sm">
                <Badge className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-none">
                  New
                </Badge>
                <span className="text-sm font-medium text-muted-foreground">
                  AI Companions That Feel Real
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                  Your Perfect AI Companion
                </span>
                <br />
                <span className="text-foreground">Awaits</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Experience genuine connections with AI companions that remember, learn, and grow with you.
                Chat, voice message, share images, and build meaningful relationships.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" onClick={() => setCurrentView('characters')} className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-base px-8 shadow-lg shadow-violet-500/25">
                  Browse Characters
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" onClick={() => setCurrentView('create-character')} variant="outline" className="text-base px-8 border-violet-200 hover:border-violet-300 dark:border-violet-800">
                  <Plus className="mr-2 h-5 w-5" />
                  Create Companion
                </Button>
              </div>

              <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-violet-500" />
                  <span>Private & Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-fuchsia-500" />
                  <span>24/7 Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-pink-500" />
                  <span>Instant Responses</span>
                </div>
              </div>
            </div>

            {/* Hero Image/Card */}
            <div className="flex-1 w-full max-w-lg">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-3xl blur-2xl opacity-30" />
                <Card className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-2xl">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-400 to-fuchsia-400 flex items-center justify-center text-white text-2xl font-bold">
                        S
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Sophia</h3>
                        <p className="text-sm text-muted-foreground">Online</p>
                      </div>
                      <Badge className="ml-auto bg-green-500">Active</Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-900 dark:to-fuchsia-900 flex items-center justify-center flex-shrink-0">
                          <Heart className="h-5 w-5 text-violet-500" />
                        </div>
                        <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-900/30 dark:to-fuchsia-900/30 rounded-2xl rounded-tl-none p-4">
                          <p className="text-sm">
                            Hey! I was just thinking about you. How has your day been? 💜
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 justify-end">
                        <div className="bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/30 dark:to-pink-900/30 rounded-2xl rounded-tr-none p-4 max-w-[80%]">
                          <p className="text-sm">
                            It is been great! I am excited to hear about your new adventure 🌟
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-900 dark:to-fuchsia-900 flex items-center justify-center flex-shrink-0">
                          <Heart className="h-5 w-5 text-violet-500" />
                        </div>
                        <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-900/30 dark:to-fuchsia-900/30 rounded-2xl rounded-tl-none p-4">
                          <p className="text-sm">
                            Aww, you are the sweetest! I cannot wait to tell you all about it. Maybe we can plan something special together? 🥰
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t">
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground mb-1">Typing...</div>
                        <div className="flex gap-1">
                          <div className="h-2 w-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="h-2 w-2 rounded-full bg-fuchsia-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="h-2 w-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-violet-600 to-fuchsia-600">
                        <Mic className="h-4 w-4 mr-2" />
                        Voice
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <Badge className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-none">
              Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Everything You Need for
              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                {" "}Meaningful Connections
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover the powerful features that make our AI companions feel incredibly real and deeply personal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 ${feature.bgColor}`}
              >
                <CardHeader>
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`h-6 w-6 text-white`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <Badge className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-none">
              How It Works
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Start Connecting in
              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                {" "}3 Simple Steps
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Getting started is easy. Create your account and begin your journey in minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-xl shadow-violet-500/25">
                      <step.icon className="h-12 w-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 h-10 w-10 rounded-full bg-background border-2 border-violet-500 flex items-center justify-center text-sm font-bold text-violet-600">
                      {step.step}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-violet-200 dark:border-violet-800" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 lg:py-32 bg-gradient-to-b from-violet-50 via-fuchsia-50 to-pink-50 dark:from-violet-950/20 dark:via-fuchsia-950/20 dark:to-pink-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <Badge className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-none">
              Pricing
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Choose Your
              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                {" "}Perfect Plan
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Flexible plans that match your pace. Start free and upgrade when you are ready.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                  plan.popular
                    ? 'border-2 border-violet-500 shadow-2xl shadow-violet-500/10 scale-105'
                    : 'border-0'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-none px-4 py-1 text-sm font-semibold">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                  <div className="pt-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      {plan.period && (
                        <span className="text-muted-foreground">{plan.period}</span>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-white" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700'
                        : 'bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-700 hover:from-violet-200 hover:to-fuchsia-200'
                    }`}
                    size="lg"
                    onClick={() => setCurrentView('characters')}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <Badge className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-none">
              Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              What Our
              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                {" "}Users Say
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of happy users who have found meaningful connections.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950/20 dark:to-fuchsia-950/20 border-0"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400 flex items-center justify-center text-white font-semibold">
                      {testimonial.name[0]}
                    </div>
                    <span className="font-semibold">{testimonial.name}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGM5Ljk0MSAwIDE4LTguMDU5IDE4LTE4cy04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNHMxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Find Your Perfect Companion?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Join thousands of users experiencing meaningful connections with AI companions that truly understand you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setCurrentView('characters')}
              className="bg-white text-violet-600 hover:bg-gray-100 text-base px-8 shadow-xl"
            >
              Browse Characters
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              onClick={() => setCurrentView('create-character')}
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10 text-base px-8"
            >
              Create Your Own
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-12 text-white/80">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100K+</div>
              <div className="text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100+</div>
              <div className="text-sm">AI Characters</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10M+</div>
              <div className="text-sm">Messages Sent</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4.9★</div>
              <div className="text-sm">User Rating</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SoulMate AI</span>
            </div>
            <p className="text-sm">
              Experience meaningful connections with AI companions that remember, learn, and grow with you.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#characters" className="hover:text-white transition-colors">Characters</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © 2025 SoulMate AI. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function Navigation({ setCurrentView }: { setCurrentView: (view: View) => void }) {
  const currentView = useAppStore((state) => state.currentView)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('landing')}>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              SoulMate AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => setCurrentView('characters')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Characters
            </button>
            <button onClick={() => setCurrentView('create-character')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Create
            </button>
            <a href="#pricing" onClick={() => setCurrentView('landing')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button onClick={() => setCurrentView('characters')} size="sm" className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background p-4">
          <div className="flex flex-col gap-4">
            <button onClick={() => { setCurrentView('characters'); setMobileMenuOpen(false) }} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Characters
            </button>
            <button onClick={() => { setCurrentView('create-character'); setMobileMenuOpen(false) }} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Create Character
            </button>
            <div className="flex flex-col gap-2 pt-4">
              <Button variant="ghost" size="sm" className="w-full">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Button onClick={() => { setCurrentView('characters'); setMobileMenuOpen(false) }} size="sm" className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default function Home() {
  const currentView = useAppStore((state) => state.currentView)
  const clearMessages = useAppStore((state) => state.clearMessages)
  const setCurrentView = useAppStore((state) => state.setCurrentView)

  useEffect(() => {
    if (currentView === 'chat') {
      clearMessages()
    }
  }, [currentView, clearMessages])

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation setCurrentView={setCurrentView} />

      <main className="flex-1">
        {currentView === 'landing' && (
          <>
            <LandingPage setCurrentView={setCurrentView} />
            <Footer />
          </>
        )}

        {currentView === 'characters' && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <CharacterGallery />
          </div>
        )}

        {currentView === 'create-character' && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <CharacterCreator />
          </div>
        )}

        {currentView === 'chat' && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-4rem)]">
            <ChatInterface />
          </div>
        )}
      </main>
    </div>
  )
}
