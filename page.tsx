"use client"

import { useState, useRef, useEffect } from "react"
import { Send, MoreHorizontal, X, BookOpen } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  hasDetailedContent?: boolean
  detailedContent?: string
  hasVisualReference?: boolean
  visualReferenceUrl?: string
}

interface Section {
  number: string
  title: string
  subsections?: Subsection[]
  overview?: string
}

interface Subsection {
  number: string
  title: string
  content: string
  visualReference?: {
    url: string
    description: string
  }
}

// Complete Brand Guidelines Data extracted from the HTML file
const brandSections: Section[] = [
  {
    number: "01",
    title: "Brand Foundation",
    overview:
      "The core of Carenet Health's identity—mission, vision, positioning, and personality—sets the tone for everything we do. These fundamentals guide how we operate, communicate, and differentiate in the healthcare space, ensuring alignment across strategy, culture, and client experience.",
    subsections: [
      {
        number: "1.1",
        title: "Mission",
        content: "To empower our clients' success by powering the business of healthcare.",
      },
      {
        number: "1.2",
        title: "Vision",
        content:
          "Co-create value with payer, provider and healthcare technology & services clients – enabling them to measurably improve engagement, efficiency, and meaningful business and health outcomes.",
      },
      {
        number: "1.3",
        title: "Positioning",
        content:
          "Carenet Health is a tech-enabled healthcare services company empowering over 500 premier healthcare organizations to transform how healthcare is delivered and experienced. By leveraging cutting-edge AI, operational excellence, and data-driven insights, we co-create measurable value that improves engagement, efficiency, and outcomes. Our evolution from vendor to strategic operational partner reflects our ability to manage complexity, optimize workflows, and scale results—without losing the human touch.",
      },
      {
        number: "1.4",
        title: "Brand Personality Traits",
        content: `<div class="mb-6">
    <p class="text-[#343e47] mb-4">Carenet's brand personality reflects our unique position at the intersection of technology and human engagement. Traits should be consistent across all content and interactions.</p>
    
    <ul class="list-none space-y-2 ml-0 mb-4">
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Tech-forward
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Strategic
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Authoritative
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Human-centered
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Clear
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Bold
      </li>
    </ul>
    
    <p class="text-[#343e47]">These traits must be reflected in all messaging, design, and interactions, both internal and external.</p>
  </div>`,
      },
      {
        number: "1.5",
        title: "Competitive Differentiators",
        content: `<div class="mb-6">
    <p class="text-[#343e47] mb-4">Our differentiators reinforce the tangible, operational value we provide across the healthcare ecosystem:</p>
    
    <ul class="list-none space-y-2 ml-0">
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Over 20 years of experience delivering human + AI engagement
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Serves 100M+ healthcare consumers annually
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Recognized for award-winning innovation
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Advanced scalable technology infrastructure
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Trusted by over 500 healthcare organizations
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Deep healthcare domain expertise across payers, providers, and tech services
      </li>
    </ul>
  </div>`,
      },
    ],
  },
  {
    number: "02",
    title: "Visual Identity System",
    overview:
      "A clear and cohesive visual system is essential for building recognition and trust. From logo structure and typography to color application and headline emphasis, every element is intentionally designed to reflect Carenet's professional, tech-forward, and human-centered brand.",
    subsections: [
      {
        number: "2.1",
        title: "Logo System",
        content: `<div class="mb-6">
    <p class="text-[#343e47] mb-4">The Carenet Health logo is a modernized interpretation of our legacy identity. It retains the recognizable square mark—now transformed into an upward-facing arrow composed of three simplified squares.</p>
    
    <p class="text-[#343e47] mb-4">This evolution represents:</p>
    
    <ul class="list-none space-y-2 ml-0">
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Growth and innovation through forward motion
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Tech-forward thinking via clean, digital geometry
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Support and partnership through balanced structure
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Confidence and clarity through bold, minimal form
      </li>
    </ul>
  </div>`,
      },
      {
        number: "2.2",
        title: "Logo Variations",
        content: `<div class="mb-6">
    <div class="overflow-x-auto mb-6">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b-2 border-[#343E47]">
            <th class="text-left p-3 font-semibold text-[#343e47]">Logo Type</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">Colors</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">File Types</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">Usage Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Primary</td>
            <td class="p-3 font-light text-[#343e47]">Slate/Crimson</td>
            <td class="p-3 font-light text-[#343e47] text-center">
              <div class="mb-2">
                <img src="https://carenethealthcare.com/wp-content/uploads/2025/03/Carenet_Logo-Primary.png" alt="Primary logo" class="mx-auto mb-2" style="max-width: 250px;">
              </div>
              <a href="https://carenethealthcare.com/wp-content/uploads/2025/03/Carenet_Logo-Primary.eps_.zip" class="text-[#DD1533] hover:underline">EPS</a> | 
              <a href="https://carenethealthcare.com/wp-content/uploads/2025/03/Carenet_Logo-Primary.png" class="text-[#DD1533] hover:underline">PNG</a>
            </td>
            <td class="p-3 font-light text-[#343e47]">Use for all default applications unless visual contrast requires a secondary version.</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Secondary</td>
            <td class="p-3 font-light text-[#343e47]">Black/Crimson</td>
            <td class="p-3 font-light text-[#343e47] text-center">
              <div class="mb-2">
                <img src="https://carenethealthcare.com/wp-content/uploads/2025/03/Carenet_Logo-Black-Red.png" alt="Black/Crimson logo" class="mx-auto mb-2" style="max-width: 250px;">
              </div>
              <a href="https://carenethealthcare.com/wp-content/uploads/2025/03/Carenet_Logo-Black-Red.eps_.zip" class="text-[#DD1533] hover:underline">EPS</a> | 
              <a href="https://carenethealthcare.com/wp-content/uploads/2025/05/Carenet_Logo-Black-Red.webp" class="text-[#DD1533] hover:underline">PNG</a>
            </td>
            <td class="p-3 font-light text-[#343e47]">NEVER USE, Only if contrast issues arise with primary.</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]"></td>
            <td class="p-3 font-light text-[#343e47]">White/Crimson</td>
            <td class="p-3 font-light text-[#343e47] text-center">
              <div class="mb-2">
                <img src="https://carenethealthcare.com/wp-content/uploads/2025/03/Carenet_Logo-White-Red_preview.png" alt="White/Crimson logo" class="mx-auto mb-2" style="max-width: 250px;">
              </div>
              <a href="https://carenethealthcare.com/wp-content/uploads/2025/03/Carenet_Logo-White-Red.eps_.zip" class="text-[#DD1533] hover:underline">EPS</a> | 
              <a href="https://carenethealthcare.com/wp-content/uploads/2025/03/Carenet_Logo-White-Red.png" class="text-[#DD1533] hover:underline">PNG</a>
            </td>
            <td class="p-3 font-light text-[#343e47]">Use on dark backgrounds only.</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">One-Color</td>
            <td class="p-3 font-light text-[#343e47]">White</td>
            <td class="p-3 font-light text-[#343e47] text-center">
              <div class="mb-2">
                <img src="https://carenethealthcare.com/wp-content/uploads/2025/03/Carenet_Logo-White_preview.png" alt="White logo" class="mx-auto mb-2" style="max-width: 250px;">
              </div>
              <a href="https://carenethealthcare.com/wp-content/uploads/2025/03/Carenet_Logo-White.eps_.zip" class="text-[#DD1533] hover:underline">EPS</a> | 
              <a href="https://carenethealthcare.com/wp-content/uploads/2025/03/Carenet_Logo-White.png" class="text-[#DD1533] hover:underline">PNG</a>
            </td>
            <td class="p-3 font-light text-[#343e47]">Use in grayscale, B&W print, or PowerPoint with flat color backgrounds.</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]"></td>
            <td class="p-3 font-light text-[#343e47]">Black</td>
            <td class="p-3 font-light text-[#343e47] text-center">
              <div class="mb-2">
                <img src="https://carenethealthcare.com/wp-content/uploads/2025/03/Carenet_Logo-Black.png" alt="Black logo" class="mx-auto mb-2" style="max-width: 250px;">
              </div>
              <a href="https://carenethealthcare.com/wp-content/uploads/2025/03/Carenet_Logo-Black.eps_.zip" class="text-[#DD1533] hover:underline">EPS</a> | 
              <a href="https://carenethealthcare.com/wp-content/uploads/2025/03/Carenet_Logo-Black.png" class="text-[#DD1533] hover:underline">PNG</a>
            </td>
            <td class="p-3 font-light text-[#343e47]">Use in grayscale, B&W print, or PowerPoint with flat color backgrounds.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>`,
      },
      {
        number: "2.3",
        title: "Clear Space Rule",
        content:
          "To maintain the logo's visual impact, a clear space equal to the x-height of the lowercase 'a' in 'Carenet' must be maintained on all sides—top, bottom, left, and right. This exclusion zone ensures no other graphic elements, text, or images interfere with logo integrity.\n\nDefinitions:\n• Baseline: The invisible line where the letterforms rest\n• x-Height: The height of the lowercase 'a' from baseline to top\n\n📌 This applies in all media—digital, print, and environmental.",
        visualReference: {
          url: "https://carenethealthcare.com/wp-content/uploads/2025/05/clearspace.svg?height=400&width=600&text=Carenet+Logo+Clear+Space+Guidelines",
          description: "Visual example showing clear space around the Carenet Health logo",
        },
      },
      {
        number: "2.4",
        title: "Minimum Logo Size",
        content: `<div class="mb-6">
    <ul class="list-none space-y-2 ml-0 mb-4">
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        <strong>Digital:</strong> 45px wide
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        <strong>Print:</strong> Maintain legibility
      </li>
    </ul>
    
    <p class="text-[#343e47] flex items-start">
      <span class="text-[#DD1533] mr-2 mt-1">📌</span>
      <span><strong>Anything smaller requires Marketing approval <a href="mailto:marketing@carenethealth.com" class="text-[#DD1533] hover:underline">marketing@carenethealth.com</a></strong></span>
    </p>
  </div>`,
      },
      {
        number: "2.5",
        title: "Backgrounds & Legibility",
        content: `<div class="mb-6">
    <p class="text-[#343e47] mb-4">To maintain maximum legibility and brand clarity, the logo must always be placed with attention to contrast and background complexity.</p>
    
    <ul class="list-none space-y-2 ml-0 mb-4">
      <li class="text-[#343e47]">
        <div class="flex items-start">
          <span class="text-[#DD1533] mr-2 mt-1">■</span>
          <div>
            <span>Logos must only appear on high-contrast backgrounds—light logos on dark, and dark logos on light. If contrast is questionable, default to the white or black one-color logo version.</span>
            <ul class="list-none space-y-2 ml-4 mt-2">
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#343e47] mr-2 mt-1">○</span>
                <span>Avoid mid-tone backgrounds (e.g., grays, gradients, overlays) that compromise legibility.</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#343e47] mr-2 mt-1">○</span>
                <span>Do not place the logo over busy, complex, or cluttered imagery. When using photography, apply a dark or light overlay to ensure sufficient clarity behind the logo.</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#343e47] mr-2 mt-1">○</span>
                <span>Use additional clear space in crowded layouts or when placing the logo over textured or layered compositions.</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#343e47] mr-2 mt-1">○</span>
                <span>Acceptable backgrounds include:</span>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
    
    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <p class="text-[#343e47] flex items-start">
        <span class="text-yellow-600 mr-2 mt-1">⚠️</span>
        <span><strong>Never place the logo on top of gradients, visual effects, or filter overlays that compromise legibility or color accuracy.</strong></span>
      </p>
    </div>
    
    <p class="text-[#343e47] flex items-start">
      <span class="text-[#DD1533] mr-2 mt-1">📌</span>
      <span>If you're unsure and have questions, contact us at <a href="mailto:marketing@carenethealthcare.com" class="text-[#DD1533] hover:underline">marketing@carenethealthcare.com</a></span>
    </p>
  </div>`,
      },
      {
        number: "2.6",
        title: "Unauthorized Modifications",
        content: `<div class="mb-6">
    <p class="text-[#343e47] mb-4">The Carenet Health logo may not be modified in any way. The following restrictions apply:</p>
    
    <div class="overflow-x-auto mb-6">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b-2 border-[#343E47]">
            <th class="text-left p-3 font-semibold text-[#343e47]">Do Not</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">Example / Clarification</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Resize disproportionately or rotate the logo</td>
            <td class="p-3 font-light text-[#343e47]">Maintain original proportions and horizontal orientation</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Use unapproved colors</td>
            <td class="p-3 font-light text-[#343e47]">Only brand-approved palette variants are permitted</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Apply shadows, outlines, gradients, or other effects</td>
            <td class="p-3 font-light text-[#343e47]">The logo must remain flat and clean—no embellishments</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Crowd the logo with other elements inside its clear space</td>
            <td class="p-3 font-light text-[#343e47]">Always maintain minimum spacing defined in Section 2.3</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Reconstruct, split, or rearrange any logo components</td>
            <td class="p-3 font-light text-[#343e47]">The wordmark and symbol must remain locked in their original configuration</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Use the logo in place of words or letters</td>
            <td class="p-3 font-light text-[#343e47]">Do not use it to replace part of a sentence, e.g., <em>"If [Carenet logo] can help you…"</em></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>`,
      },
      {
        number: "2.7",
        title: "Color System",
        content: `<div class="mb-6">
  <h4 class="font-semibold text-[#343e47] mb-3">Primary Palette:</h4>
  <div class="overflow-x-auto mb-6">
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b-2 border-[#343E47]">
          <th class="text-left p-3 font-semibold text-[#343e47]">Color</th>
          <th class="text-left p-3 font-semibold text-[#343e47]">HEX</th>
          <th class="text-left p-3 font-semibold text-[#343e47]">RGB</th>
          <th class="text-left p-3 font-semibold text-[#343e47]">CMYK</th>
          <th class="text-left p-3 font-semibold text-[#343e47]">Pantone</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Crimson</td>
          <td class="p-3 font-light text-[#343e47]">#DD1533</td>
          <td class="p-3 font-light text-[#343e47]">221,21,51</td>
          <td class="p-3 font-light text-[#343e47]">7,100,86,1</td>
          <td class="p-3 font-light text-[#343e47]">199C</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Slate</td>
          <td class="p-3 font-light text-[#343e47]">#343e47</td>
          <td class="p-3 font-light text-[#343e47]">52,62,71</td>
          <td class="p-3 font-light text-[#343e47]">77,64,53,44</td>
          <td class="p-3 font-light text-[#343e47]">432C</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Air</td>
          <td class="p-3 font-light text-[#343e47]">#F9F9F9</td>
          <td class="p-3 font-light text-[#343e47]">249,249,249</td>
          <td class="p-3 font-light text-[#343e47]">2,1,1,0</td>
          <td class="p-3 font-light text-[#343e47]">P 179-1C</td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4 class="font-semibold text-[#343e47] mb-3">Special Use Palette:</h4>
  <div class="overflow-x-auto mb-4">
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b-2 border-[#343E47]">
          <th class="text-left p-3 font-semibold text-[#343e47]">Color</th>
          <th class="text-left p-3 font-semibold text-[#343e47]">HEX</th>
          <th class="text-left p-3 font-semibold text-[#343e47]">RGB</th>
          <th class="text-left p-3 font-semibold text-[#343e47]">CMYK</th>
          <th class="text-left p-3 font-semibold text-[#343e47]">Pantone</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Horizon</td>
          <td class="p-3 font-light text-[#343e47]">#C3E3ED</td>
          <td class="p-3 font-light text-[#343e47]">195,227,237</td>
          <td class="p-3 font-light text-[#343e47]">22,2,5,0</td>
          <td class="p-3 font-light text-[#343e47]">7457U</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
    <p class="text-[#343e47] flex items-start">
      <span class="text-yellow-600 mr-2 mt-1">⚠️</span>
      <span><strong>Horizon is only used for overlays on photography and data charts. It is not permitted for icons, backgrounds, or typography.</strong></span>
    </p>
  </div>
</div>`,
 visualReference: {
  url: "https://carenethealthcare.com/wp-content/uploads/2025/05/2.7color.png",
  description: "Brand color palette showing Crimson, Slate, and Air colors",
},
      },
      {
        number: "2.8",
        title: "Crimson & Slate Tint Guidelines",
        content: `<div class="mb-6">
    <p class="text-[#343e47] mb-4">Crimson (Pantone 199 C | #DD1533) & Slate (Pantone 432 C | #343E47) may be used in tints for visual layering, and select data visualization elements.</p>
    
    <div class="mb-4">
      <p class="text-[#343e47] mb-3"><strong>For Crimson:</strong></p>
      <ul class="list-none space-y-2 ml-0">
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#DD1533] mr-2">■</span>
          100% Crimson: Default accent color for callouts, highlights, and icon emphasis
        </li>
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#DD1533] mr-2">■</span>
          70% Crimson: For approved data visualizations (not for text)
        </li>
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#DD1533] mr-2">■</span>
          50% Crimson: For approved data visualizations (not for text)
        </li>
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#DD1533] mr-2">■</span>
          20% Crimson: For approved data visualizations (not for text)
        </li>
      </ul>
    </div>
    
    <div class="mb-4">
      <p class="text-[#343e47] mb-3"><strong>For Slate:</strong></p>
      <ul class="list-none space-y-2 ml-0">
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#DD1533] mr-2">■</span>
          Slate tints must be applied as fills, not opacity masks
        </li>
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#DD1533] mr-2">■</span>
          Never use Slate tints below 20%—reduced visibility compromises accessibility
        </li>
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#DD1533] mr-2">■</span>
          Only approved tint values: 100%, 70%, 50%, 20%
        </li>
      </ul>
    </div>
  </div>`,
      },
      {
        number: "2.9",
        title: "Typography Settings",
        content: `<div class="mb-6">
  <div class="overflow-x-auto">
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b-2 border-[#343E47]">
          <th class="text-left p-3 font-semibold text-[#343e47]">Use Case</th>
          <th class="text-left p-3 font-semibold text-[#343e47]">Font Family</th>
          <th class="text-left p-3 font-semibold text-[#343e47]">Weight / Style</th>
          <th class="text-left p-3 font-semibold text-[#343e47]">Size</th>
          <th class="text-left p-3 font-semibold text-[#343e47]">Tracking</th>
          <th class="text-left p-3 font-semibold text-[#343e47]">Leading</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Body Copy (design)</td>
          <td class="p-3 font-light text-[#343e47]">PP Neue Montreal</td>
          <td class="p-3 font-light text-[#343e47]">Book</td>
          <td class="p-3 font-light text-[#343e47]">11 pt</td>
          <td class="p-3 font-light text-[#343e47]">30</td>
          <td class="p-3 font-light text-[#343e47]">16 pt</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Headlines</td>
          <td class="p-3 font-light text-[#343e47]">Neue Haas Grotesk Display</td>
          <td class="p-3 font-light text-[#343e47]">Medium</td>
          <td class="p-3 font-light text-[#343e47]">Variable</td>
          <td class="p-3 font-light text-[#343e47]">Auto</td>
          <td class="p-3 font-light text-[#343e47]">Based on layout</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Subheads (optional)</td>
          <td class="p-3 font-light text-[#343e47]">Neue Haas Grotesk Display</td>
          <td class="p-3 font-light text-[#343e47]">Roman</td>
          <td class="p-3 font-light text-[#343e47]">Variable</td>
          <td class="p-3 font-light text-[#343e47]">Auto</td>
          <td class="p-3 font-light text-[#343e47]">Based on layout</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Lists (emphasis)</td>
          <td class="p-3 font-light text-[#343e47]">PP Neue Montreal</td>
          <td class="p-3 font-light text-[#343e47]">SemiBold</td>
          <td class="p-3 font-light text-[#343e47]">Match body</td>
          <td class="p-3 font-light text-[#343e47]">Match</td>
          <td class="p-3 font-light text-[#343e47]">20 pt</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`,
      {
        number: "2.10",
        title: "Headline Emphasis Rule",
        content: `<div class="mb-6">
    <p class="text-[#343e47] mb-4">Headlines are a core component of Carenet's visual voice and must be styled with intentional clarity and emphasis.</p>
    
    <div class="overflow-x-auto mb-6">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b-2 border-[#343E47]">
            <th class="text-left p-3 font-semibold text-[#343e47]">Category</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">Rule</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">Do</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">Don't</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Color Usage</td>
            <td class="p-3 font-light text-[#343e47]">Max 3 words in Crimson (Pantone 199C / #DD1533) per headline</td>
            <td class="p-3 font-light text-[#343e47]">Use Slate (Pantone 432C / #343E47) or 20% Slate for non-emphasized words</td>
            <td class="p-3 font-light text-[#343e47]">Avoid coloring filler words (e.g., "and," "of," "the")</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]"></td>
            <td class="p-3 font-light text-[#343e47]">On dark backgrounds, default all headline text to white</td>
            <td class="p-3 font-light text-[#343e47]"></td>
            <td class="p-3 font-light text-[#343e47]">Never use Crimson or tints on dark backgrounds</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Weight Usage</td>
            <td class="p-3 font-light text-[#343e47]">Emphasized words (Crimson) = Neue Haas Grotesk Display – Medium</td>
            <td class="p-3 font-light text-[#343e47]">Non-emphasized words = Neue Haas Grotesk Display – Roman</td>
            <td class="p-3 font-light text-[#343e47]">Never bold an entire headline</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Casing Rules</td>
            <td class="p-3 font-light text-[#343e47]">Headlines = Title Case</td>
            <td class="p-3 font-light text-[#343e47]">Callout/stat headlines = Sentence case</td>
            <td class="p-3 font-light text-[#343e47]">Avoid all caps unless pre-approved (e.g., section headers)</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Restrictions</td>
            <td class="p-3 font-light text-[#343e47]"></td>
            <td class="p-3 font-light text-[#343e47]"></td>
            <td class="p-3 font-light text-[#343e47]">Never use Slate tints below 20%Don't apply multiple colors within the same wordDon't emphasize randomly—tie to value-driven terms</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mb-4">
      <p class="text-[#343e47] font-bold mb-2">This example demonstrates headline emphasis using Crimson (Pantone 199C / #DD1533) for up to three value-driven words, Slate (Pantone 432C / #343E47) for remaining text, and a mix of Title Case and Sentence case to reflect tone and hierarchy—following Carenet's approved typography, weight, and color usage rules.</p>
    </div>
  </div>`,
  visualReference: {
    url: "https://carenethealthcare.com/wp-content/uploads/2025/05/correctly-styled-headline-using-Crimson-and-20-Slate.png",
    description: "Example headline with proper emphasis styling",
  },
      {
        number: "2.11",
        title: "System Font Family for Non-Designers",
        content: `<div class="mb-6">
    <p class="text-[#343e47] mb-4">In environments where brand fonts are not available (e.g., MS Office), use Aptos:</p>
    
    <div class="overflow-x-auto mb-6">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b-2 border-[#343E47]">
            <th class="text-left p-3 font-semibold text-[#343e47]">Use Case</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">Font Style</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Headline</td>
            <td class="p-3 font-light text-[#343e47]">Aptos Regular</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Emphasis Phrase</td>
            <td class="p-3 font-light text-[#343e47]">Aptos Bold</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Body Copy</td>
            <td class="p-3 font-light text-[#343e47]">Aptos Light</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="mb-4">
      <p class="text-[#343e47] mb-3"><strong>Use Aptos in:</strong></p>
      <ul class="list-none space-y-2 ml-0">
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#DD1533] mr-2">■</span>
          Microsoft Word
        </li>
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#DD1533] mr-2">■</span>
          PowerPoint
        </li>
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#DD1533] mr-2">■</span>
          Outlook
        </li>
      </ul>
    </div>
    
    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <p class="text-[#343e47] flex items-start">
        <span class="text-yellow-600 mr-2 mt-1">⚠️</span>
        <span><strong>Avoid using Arial, Calibri, or Times New Roman.</strong></span>
      </p>
    </div>
     <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
      <p class="text-[#343e47] flex items-start">
        <span class="text-red-500 mr-2 mt-1">❌</span>
        <span><strong>Do not substitute Aptos with Calibri, Segoe UI, Helvetica, or any system font not listed in this guide.</strong></span>
      </p>
    </div>
    
    <p class="text-[#343e47]">
      <span class="text-[#DD1533] mr-2">📌</span>
      For additional information and/or examples,contact <a href="mailto:marketing@carenethealth.com" class="text-[#DD1533] hover:underline">marketing@carenethealth.com</a>.
    </p>
  </div>`,
  visualReference: {
    url: "https://carenethealthcare.com/wp-content/uploads/2025/05/Screenshot-2025-05-26-at-2.13.47 PM.png",
    description: "System font family examples showing Aptos usage in Microsoft Office applications",
  },
},
      {
        number: "2.12",
        title: "Decorative Use of the Carenet Mark",
        content: `<div class="mb-6">
    <div class="grid grid-cols-4 gap-4 mb-6">
      <div class="text-center">
        <img src="https://carenethealthcare.com/wp-content/uploads/2025/03/Primary-Red.png" alt="Crimson Brand Mark" class="w-16 h-16 mx-auto mb-2">
        <div class="text-sm">
          <a href="https://carenethealthcare.com/wp-content/uploads/2025/03/Primary-Red.eps_.zip" class="text-[#DD1533] hover:underline">EPS</a>
          <span class="text-[#343e47]"> | </span>
          <a href="https://carenethealthcare.com/wp-content/uploads/2025/03/Primary-Red-1.png" class="text-[#DD1533] hover:underline">PNG</a>
        </div>
        <p class="text-[#343e47] text-sm mt-2 font-medium">Crimson Brand Mark</p>
      </div>
      <div class="text-center">
        <img src="https://carenethealthcare.com/wp-content/uploads/2025/03/Primary-Air_Preview.png" alt="Air Brand Mark" class="w-16 h-16 mx-auto mb-2">
        <div class="text-sm">
          <a href="https://carenethealthcare.com/wp-content/uploads/2025/03/Primary-Air.eps_.zip" class="text-[#DD1533] hover:underline">EPS</a>
          <span class="text-[#343e47]"> | </span>
          <a href="https://carenethealthcare.com/wp-content/uploads/2025/03/Primary-Air.png" class="text-[#DD1533] hover:underline">PNG</a>
        </div>
        <p class="text-[#343e47] text-sm mt-2 font-medium">Air Brand Mark</p>
      </div>
      <div class="text-center">
        <img src="https://carenethealthcare.com/wp-content/uploads/2025/03/Primary-Red-Stroke.png" alt="Crimson Brand Mark" class="w-16 h-16 mx-auto mb-2">
        <div class="text-sm">
          <a href="https://carenethealthcare.com/wp-content/uploads/2025/03/Primary-Red-Stroke.eps_.zip" class="text-[#DD1533] hover:underline">EPS</a>
          <span class="text-[#343e47]"> | </span>
          <a href="https://carenethealthcare.com/wp-content/uploads/2025/03/Primary-Red-Stroke.png" class="text-[#DD1533] hover:underline">PNG</a>
        </div>
        <p class="text-[#343e47] text-sm mt-2 font-medium">Crimson Brand Mark</p>
      </div>
      <div class="text-center">
        <img src="https://carenethealthcare.com/wp-content/uploads/2025/03/Primary-White-Stroke_Preview.png" alt="Air Lined Brand Mark" class="w-16 h-16 mx-auto mb-2">
        <div class="text-sm">
          <a href="https://carenethealthcare.com/wp-content/uploads/2025/03/Primary-White-Stroke.eps_.zip" class="text-[#DD1533] hover:underline">EPS</a>
          <span class="text-[#343e47]"> | </span>
          <a href="https://carenethealthcare.com/wp-content/uploads/2025/03/Primary-White-Stroke.png" class="text-[#DD1533] hover:underline">PNG</a>
        </div>
        <p class="text-[#343e47] text-sm mt-2 font-medium">Air Lined Brand Mark</p>
      </div>
    </div>
    
    <div class="mt-6">
      <ul class="list-none space-y-2 ml-0">
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#DD1533] mr-2">■</span>
          Always apply at 50% opacity using the Multiply blending mode for a low-contrast effect
        </li>
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#DD1533] mr-2">■</span>
          Position only in background roles, such as page corners, footers, or behind section headers
        </li>
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#DD1533] mr-2">■</span>
          Must remain inside the margin boundaries unless specifically approved by Creative
        </li>
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#DD1533] mr-2">■</span>
          Never obstruct legibility or overlap with copy
        </li>
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#DD1533] mr-2">■</span>
          Do not distort, recolor, rotate, or use the mark as a dominant foreground element
        </li>
      </ul>
    </div>
  </div>`,
      },
      {
        number: "2.13",
        title: "Brand Mark Sizes",
        content: `<div class="mb-6">
    <ul class="list-none space-y-2 ml-0 mb-4">
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        <strong>Maximum size:</strong> 0.36 in × 0.37 in (used in headers, hero placements, or large-format layouts)
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        <strong>Minimum size:</strong> 0.18 in × 0.19 in (used in footers, email signatures, or small digital components)
      </li>
    </ul>
    
    <p class="text-[#343e47] mb-4">For visual reference download the <a href="https://carenethealthcare.com/wp-content/uploads/2025/05/Powering-the-Business-of-Healthcare.pdf" class="text-[#DD1533] hover:underline">Powering The Business of Healthcare</a> eBook.</p>
    
    <p class="text-[#343e47] mb-4">Must always follow clear space and placement rules outlined in Section 2.3. The mark should never be placed independently without respecting exclusion zone boundaries.</p>
    
    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <p class="text-[#343e47] flex items-start">
        <span class="text-yellow-600 mr-2 mt-1">⚠️</span>
        <span><strong>Visual Effects Restriction:</strong></span>
      </p>
      <p class="text-[#343e47] mt-2">Do not apply drop shadows, inner glows, outer glows, gradient overlays, bevels, or any layered visual effects to icons, the Carenet brand mark, photography, or background elements. All visuals must maintain a flat, clean, brand-aligned aesthetic unless specifically approved by the Creative Team.</p>
    </div>
  </div>`,
      },
    ],
  },
  {
    number: "03",
    title: "Photography & Imagery",
    overview:
      "Imagery plays a critical role in shaping perception. Carenet's photography principles prioritize authentic, context-driven visuals that reflect real people, real environments, and real interactions. Visual tone should convey credibility, empathy, and clarity—never staged, exaggerated, or overly conceptual.",
    subsections: [
      {
 {
  number: "3.1",
  title: "Overall Style & Tone",
  content: `<div class="mb-6">
    <p class="text-[#343e47] mb-4">Carenet Health's photography should reflect the intersection of:</p>
    
    <ul class="list-none space-y-2 ml-0 mb-4">
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Healthcare professionalism
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Bedside manner and patient engagement
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Business operations and executive decision-making
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Human-centered technology (real—not conceptual or overly digitized)
      </li>
    </ul>
    
    <p class="text-[#343e47] mb-4">The tone must remain grounded, relatable, and credible. Photos should feel authentic—not staged, stocky, or emotionally exaggerated. The goal is to express trust, support, and clarity—using real people in real environments.</p>
    
    <p class="text-[#343e47] mb-4">Avoid common stock clichés, including:</p>
    
    <ul class="list-none space-y-2 ml-0 mb-4">
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Artificial light flares, sci-fi overlays, or overtly stylized light leaks
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Overlay graphics imposed on real people (e.g., floating lock icons, holograms, or fake UI elements)
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Over-filtered portraits or staged emotions
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Conceptual images that use symbolism in place of real context (e.g., chess pieces, puzzle pieces, ladders, glowing hands)
      </li>
    </ul>
    
    <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
      <p class="text-[#343e47] flex items-start">
        <span class="text-red-500 mr-2 mt-1">❌</span>
        <span><strong>Do not use hokey, comical, or gimmicky imagery—ever. Even for internal use, unprofessional visuals undermine the credibility and tone of the brand. Avoid meme-style stock photos, exaggerated facial expressions, or images that prioritize humor over clarity. Integrity matters across every touchpoint.</strong></span>
      </p>
    </div>
    
    <p class="text-[#343e47] flex items-start mb-4">
      <span class="text-[#DD1533] mr-2 mt-1">📌</span>
      <span>We do not use photography as metaphor. Visuals should depict real moments in the business of healthcare—decision-making, caregiving, and connection—without decoration.</span>
    </p>
    
    <p class="text-[#343e47] flex items-start mb-4">
      <span class="text-[#DD1533] mr-2 mt-1">📌</span>
      <span>Subjects should feel present in their environment—not staged in front of green screens or fake backdrops.</span>
    </p>
    
    <p class="text-[#343e47] flex items-start">
      <span class="text-[#DD1533] mr-2 mt-1">📌</span>
      <span>If unsure about photo tone, see Section 3.2 (Color Balance), Section 3.3 (Subject Framing & Focus), or consult <a href="mailto:marketing@carenethealthcare.com" class="text-[#DD1533] hover:underline">marketing@carenethealthcare.com</a> for review.</span>
    </p>
  </div>`,
}
      {
        number: "3.2",
        title: "Color Balance",
        content: `<div class="mb-6">
    <p class="text-[#343e47] mb-4">Carenet's visual identity relies on a careful balance of color to maintain consistency, clarity, and emotional tone across all brand imagery. Because Crimson is such a bold accent in our palette, we intentionally use blue as the dominant visual anchor in photography to create a grounded, calming contrast. Blue tones evoke professionalism, trust, and balance—especially in healthcare environments where emotional neutrality and clarity are essential.</p>
    
    <p class="text-[#343e47] mb-4">This is why, in all photography, blue should be naturally present through elements like walls, clothing (e.g., scrubs), signage, or environmental details. When those tones are missing, we use a subtle overlay to bring images into alignment with our brand's tonal expectations.</p>
    
    <p class="text-[#343e47] mb-4">When that balance isn't present, apply a Horizon overlay (Pantone 7457U | #C3E3ED) to reinforce the brand's blue-to-neutral tonal range.</p>
    
    <ul class="list-none space-y-2 ml-0 mb-4">
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Horizon is used only on photography to bring balance and visual cohesion where natural blue tones are lacking
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        The goal is to visually offset the intensity of Crimson by introducing a soft, cool undertone
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Do not apply Horizon over skin tones directly, as it may introduce a greenish cast
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Blend modes like Multiply or Soft Light at ~20-40% opacity <u>are</u> recommended for subtle application
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Horizon is a balancing tool, not a decorative filter-it should never overpower the subject
      </li>
    </ul>
    
    <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
      <p class="text-[#343e47] flex items-start">
        <span class="text-red-500 mr-2 mt-1">📌</span>
        <span><strong>"Do not use Horizon on people's skin or scrubs directly. It is a background tone-leveling tool."</strong></span>
      </p>
    </div>
    
    <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
      <p class="text-[#343e47] flex items-start">
        <span class="text-red-500 mr-2 mt-1">📌</span>
        <span><strong>"Do not apply Horizon to white lab coats, teeth, or medical equipment—it flattens contrast."</strong></span>
      </p>
    </div>
    
    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <p class="text-[#343e47] flex items-start">
        <span class="text-yellow-600 mr-2 mt-1">📌</span>
        <span><strong>"Always layer Horizon overlays behind the subject, not over their face or body."</strong></span>
      </p>
    </div>
    
    <p class="text-[#343e47] flex items-start">
      <span class="text-[#DD1533] mr-2 mt-1">📌</span>
      <span>For full brand color rules, see Section 2.2 (Color System).</span>
    </p>
  </div>`,
      },
      {
        number: "3.3",
        title: "Subject Framing & Focus",
        content: `<div class="mb-6">
    <div class="overflow-x-auto mb-6">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b-2 border-[#343E47]">
            <th class="text-left p-3 font-semibold text-[#343e47]">Category</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">Rule / Guidance</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Guiding Principle</td>
            <td class="p-3 font-light text-[#343e47]">Carenet's photography prioritizes <strong>activity over posed expressions</strong>. We don't lead with smiles—we focus on the work, the moment, or the gesture. The goal is to capture real, in-progress interactions that reflect the business of healthcare.</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Framing Rules</td>
            <td class="p-3 font-light text-[#343e47]">- Focus should be <strong>below the eyes</strong> (mouth, hands, body language)- Show <strong>context over emotion</strong>: patients, advisors, executives in natural situations- Crop with intent; allow <strong>whitespace</strong> for layout layering</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Group Shots</td>
            <td class="p-3 font-light text-[#343e47]">- Group shots are acceptable but must follow the <strong>focus-on-action guidance</strong>- Difficult to avoid faces? Use <strong>below-eye framing or side-facing shots</strong></td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Pose/Angle Guidance</td>
            <td class="p-3 font-light text-[#343e47]">- Choose photos where <strong>most (if not all)</strong> subjects are facing to the side- <strong>Side profiles are permitted</strong> to reduce emotion and maintain neutrality</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Two-Person Rule</td>
            <td class="p-3 font-light text-[#343e47]">If two people are in frame, <strong>one may show a side-facing expression</strong>; the other's face should be cropped to <strong>de-emphasize</strong> facial focus</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Creative Priority</td>
            <td class="p-3 font-light text-[#343e47]">Always emphasize <strong>gesture and interaction over expression</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
      <p class="text-[#343e47] mb-3"><strong>Avoid:</strong></p>
      <ul class="list-none space-y-2 ml-0">
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#343e47] mr-2">■</span>
          Full-face portraits unless purposefully editorial
        </li>
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#343e47] mr-2">■</span>
          Direct eye contact unless used with intent
        </li>
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#343e47] mr-2">■</span>
          Cropping too tightly—leave breathing room
        </li>
      </ul>
    </div>
    
    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <p class="text-[#343e47] flex items-start">
        <span class="text-yellow-600 mr-2 mt-1">📌</span>
        <span><strong>If unsure how to frame, refer to the visual samples in the brand asset library or consult the <a href="mailto:marketing@carenethealthcare.com" class="text-[#DD1533] hover:underline">Creative Team</a>.</strong></span>
      </p>
    </div>
  </div>`,
      },
      {
        number: "3.4",
        title: "Headshots & Editorial Portraits",
        content: `<div class="mb-6">
    <ul class="list-none space-y-2 ml-0 mb-4">
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        All formal headshots must be black-and-white to maintain a consistent, polished aesthetic across leadership, speaking events, and internal documentation.
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Keep compositions clean and neutral—no harsh shadows, colored lighting, or overly stylized edits.
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Use consistent lighting (diffused, front-facing) to ensure even exposure across all headshots.
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Backdrops must be light gray or neutral—no patterns, colored walls, or branded step-and-repeat backdrops.
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Framing: Face should be centered, cropped mid-chest or shoulders. Leave clear space above the head.
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Expression: Neutral or slight smile; avoid expressive or exaggerated poses unless editorially approved.
      </li>
    </ul>
    
    <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
      <p class="text-[#343e47]">
        <strong>Headshots must not include props, logos, or busy environments.</strong>
      </p>
          <p class="text-[#343e47]">Used for leadership decks, internal org charts, speaker profiles, and select external campaigns.</p>

    </div>
    
  </div>`,
},
{
number: "3.5",
  title: "Subject Matter Rules",
  content: `<div class="mb-6">
    <p class="text-[#343e47] mb-4 italic">Photography should capture relatable, real-world healthcare moments—never staged or artificial. These rules ensure imagery supports trust, clarity, and emotional alignment with the brand.</p>
    
    <div class="flex items-center gap-2 mb-4">
      <div class="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
        <span class="text-white text-xs font-bold">✓</span>
      </div>
      <h4 class="font-semibold text-[#343e47]">Do:</h4>
    </div>
    
    <ul class="list-disc ml-6 space-y-2 mb-6 text-[#343e47]">
      <li>Use real people—not digital avatars, illustrations, or abstract representations</li>
      <li>Film in authentic environments: hospitals, clinics, homes, or workspaces</li>
      <li>Reflect diversity across race, age, gender, and healthcare roles</li>
      <li>Use natural light or soft controlled lighting</li>
      <li>Keep visual focus on the interaction, not dramatic effects</li>
    </ul>
    
    <div class="flex items-center gap-2 mb-4">
      <div class="w-5 h-5 bg-red-500 rounded flex items-center justify-center">
        <span class="text-white text-xs font-bold">🚫</span>
      </div>
      <h4 class="font-semibold text-[#343e47]">Don't:</h4>
    </div>
    
    <ul class="list-disc ml-6 space-y-2 mb-6 text-[#343e47]">
      <li>Use theatrical lighting, extreme shadows, or dramatic color grading</li>
      <li>Pose subjects unnaturally or in exaggerated emotional states</li>
      <li>Use green screens, AI composites, or digitally constructed settings</li>
      <li>Show empty rooms with disconnected people or ambiguous context</li>
      <li>Crop in a way that removes key emotional cues (hands, eye contact, etc.)</li>
    </ul>
 </div>`
},
    ]
  },
  {
    number: "04",
       number: "04",
    title: "Grid System",
    overview:
      "Carenet Health uses a consistent modular grid system across all branded collateral to ensure visual consistency, professional layout structure, and flexibility in communication formats. This system is inspired by the Swiss International Typographic Style and supports both creative expression and strict alignment discipline.",
    subsections: [
      {
        number: "4.1",
        title: "Base Grid Structure",
        content: `<div class="mb-6">
    <p class="text-[#343e47] mb-6">The Carenet layout grid is based on a strict 5×8 modular framework, adapted to multiple asset types. This grid governs the placement of every element—text blocks, imagery, stats, callouts, and headlines—ensuring alignment, breathing room, and visual order across all design surfaces.</p>
    
    <div class="overflow-x-auto mb-6">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b-2 border-[#343E47]">
            <th class="text-left p-3 font-semibold text-[#343e47]">Component</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">Specification</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">Visual Reference</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Columns</td>
            <td class="p-3 font-light text-[#343e47]">5</td>
            <td class="p-3 font-light text-[#343e47] text-center" rowspan="4">
            <p class="text-xs text-[#DD1533] mb-2">Click to enlarge</p>
              <img 
                src="https://carenethealthcare.com/wp-content/uploads/2025/05/Screenshot-2025-05-22-at-10.52.39 AM.png"
                alt="Grid structure visual reference"
                class="w-32 h-auto border border-gray-200 rounded-lg p-2 cursor-pointer hover:border-[#DD1533] transition-colors mx-auto lightbox-image"
              />
            </td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Rows</td>
            <td class="p-3 font-light text-[#343e47]">8</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Gutter Spacing</td>
            <td class="p-3 font-light text-[#343e47]">0.1667" (both vertical and horizontal)</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Fit To</td>
            <td class="p-3 font-light text-[#343e47]">Margin grid (not full bleed)</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
      <p class="text-[#343e47]">
        <span class="font-bold">Note:</span> These grid settings are defined for Adobe InDesign. If working in another layout tool, match column count, gutter width, and margins exactly to maintain alignment integrity.
      </p>
    </div>
    
    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <p class="text-[#343e47] mb-3 font-bold">Key Usage Notes:</p>
      <ul class="list-none space-y-2 ml-0">
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#DD1533] mr-2">■</span>
          The 5-column structure enables flexible modular design, particularly for multi-column layouts like case studies, eBooks, and whitepapers.
        </li>
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#DD1533] mr-2">■</span>
          The grid is not decorative—it determines where elements live and how they relate to one another.
        </li>
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#DD1533] mr-2">■</span>
          Gutter spacing must always be respected. No element—copy, icon, or visual—should break across columns without aligning to the grid.
        </li>
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#DD1533] mr-2">■</span>
          All templates begin with this core grid, adjusted only within approved use cases (see Section 4.2).
        </li>
      </ul>
    </div>
  </div>`,
      },
      {
        number: "4.2",
        title: "Asset-Specific Layout Behavior",
        content: `<div class="mb-6">
    <h4 class="font-semibold text-[#343e47] mb-3">Column Structure Guidance</h4>
    <p class="text-[#343e47] mb-4">The 5-column grid is divided to serve distinct layout purposes:</p>
    
    <ul class="list-none space-y-3 ml-0 mb-6">
      <li class="text-[#343e47]">
        <div class="flex items-start">
          <span class="text-[#DD1533] mr-2 mt-1">■</span>
          <div>
            <span><strong>Columns 1 and 2</strong> (the left-most columns) are reserved for visual support content—this includes stats, callouts, iconography, labels, or other standout elements. These elements help reinforce hierarchy, simplify scannability, and break up dense content.</span>
          </div>
        </div>
      </li>
      <li class="text-[#343e47]">
        <div class="flex items-start">
          <span class="text-[#DD1533] mr-2 mt-1">■</span>
          <div>
            <span><strong>Columns 3–5</strong> (right side) house the primary body copy. Copy blocks align flush left within these columns, but the entire body text region aligns to the right page margin to create visual balance.</span>
          </div>
        </div>
      </li>
    </ul>
    
    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <p class="text-[#343e47] flex items-start">
        <span class="text-yellow-600 mr-2 mt-1">📌</span>
        <span><strong>Note:</strong> This configuration ensures a clear split between modular supporting content and narrative flow. Never place narrative content into Column 1 and half of 2 unless the layout type dictates otherwise (e.g., eBook or one-pager; see below for specifics). Always refer to design templates for guidance.</span>
      </p>
    </div>

    <div class="space-y-8">
      <div class="border-l-4 border-blue-400 pl-4">
        <h4 class="font-semibold text-[#343e47] mb-3 flex items-center">
          <span class="mr-2">📘</span>
          eBook Template
        </h4>
        <p class="text-[#343e47] mb-3"><strong>Purpose:</strong> Visually dynamic, highly readable educational asset</p>
        <p class="text-[#343e47] mb-3"><strong>Grid Use:</strong></p>
        <ul class="list-none space-y-2 ml-0">
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Content blocks vary in width (2–5 columns) to emphasize pacing and hierarchy</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Heavy use of whitespace and asymmetry</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Icons, quotes, and data points are emphasized using full-column spans or modular containers and stat and icons appear in Columns 1 and half of 2 as modular callouts</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Photography and background shapes (Carenet mark outlines) are placed with intention along module edges</span>
          </li>
        </ul>
      </div>

      <div class="border-l-4 border-gray-400 pl-4">
        <h4 class="font-semibold text-[#343e47] mb-3 flex items-center">
          <span class="mr-2">📄</span>
          Whitepaper Template
        </h4>
        <p class="text-[#343e47] mb-3"><strong>Purpose:</strong> Formal, long-form content that communicates strategic thought leadership</p>
        <p class="text-[#343e47] mb-3"><strong>Grid Use:</strong></p>
        <ul class="list-none space-y-2 ml-0 mb-4">
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Balanced column layout, with body content anchored to Columns 3–5</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Column 1 often left empty or used only for context elements or icons</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Emphasis on clean, highly legible formatting</span>
          </li>
        </ul>
        <p class="text-[#343e47] mb-3"><strong>Key Notes:</strong></p>
        <ul class="list-none space-y-2 ml-0 mb-4">
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Icons are paired with bulleted information using baseline alignment</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Statistical callouts use locked-in grid proportions—typically 1 to 2 column widths</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Layouts prioritize readability over decoration</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>TOC follows tile/card format aligned to grid</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Strict right-side alignment of content region is used</span>
          </li>
        </ul>
        
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <p class="text-[#343e47] flex items-start">
            <span class="text-yellow-600 mr-2 mt-1">📌</span>
            <span><strong>TOC Formatting Rule:</strong> In whitepapers, the Table of Contents must use a tile/card format, left-aligned to the column grid. Do not center-align. Maintain consistent spacing, typographic weight, and visual rhythm. Use Slate on light backgrounds or inverse based on contrast needs. For implementation, see Appendix visual references or consult Creative.</span>
          </p>
        </div>
      </div>

      <div class="border-l-4 border-red-400 pl-4">
        <h4 class="font-semibold text-[#343e47] mb-3 flex items-center">
          <span class="mr-2">🟥</span>
          One-Pager Template
        </h4>
        <p class="text-[#343e47] mb-3"><strong>Purpose:</strong> High-density, at-a-glance executive overview with visual polish</p>
        <p class="text-[#343e47] mb-3"><strong>Grid Use:</strong></p>
        <ul class="list-none space-y-2 ml-0 mb-4">
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Content blocks span narrow columns (1–2) but never break gutter spacing</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Full modular alignment with strong emphasis on header control</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Visual hierarchy is managed using Crimson emphasis and heavy use of typographic weight</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Strict right-side alignment of content region is used</span>
          </li>
        </ul>
        <p class="text-[#343e47] mb-3"><strong>Key Notes:</strong></p>
        <ul class="list-none space-y-2 ml-0">
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Subheaders and bullets respect vertical modularity</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>No full-bleed elements; all design contained within margins. (Only exception is the boiler plate)</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Typically top-heavy in structure, ending with a high-impact summary call-to-action</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Use of Columns 1–2 for body copy is permitted in this format—but layout must remain modular and aligned</span>
          </li>
        </ul>
      </div>

      <div class="border-l-4 border-green-400 pl-4">
        <h4 class="font-semibold text-[#343e47] mb-3 flex items-center">
          <span class="mr-2">📊</span>
          Case Study Template
        </h4>
        <p class="text-[#343e47] mb-3"><strong>Purpose:</strong> Blend of strategic storytelling, visual credibility, and proof of performance</p>
        <p class="text-[#343e47] mb-3"><strong>Grid Use:</strong></p>
        <ul class="list-none space-y-2 ml-0 mb-4">
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Hero layout includes full-width or majority-width photography with type and insights locked to grid base</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Use of Columns 1-2 for body copy is permitted in this format-but layout must remain modular and aligned</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Essential Insights placed in a 1–2 column block on the left with consistent vertical alignment</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Red blocks use the full height of bottom rows for statement impact (but still snap to horizontal rows)</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Survey and Results sections use rounded rectangle stat boxes that align precisely to the grid</span>
          </li>
        </ul>
        <p class="text-[#343e47] mb-3"><strong>Key Notes:</strong></p>
        <ul class="list-none space-y-2 ml-0">
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Modular icon rows appear in the Solution section, always aligned to row divisions</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Text and graphics never float free; everything obeys vertical rhythm and horizontal gutters</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Headlines often split color or weight to reinforce importance (e.g., "Big Picture")</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span><strong>Column 1 = callouts, stats, labels only; never body copy</strong></span>
          </li>
        </ul>
      </div>
    </div>
  </div>`,
      },
      {
         number: "4.3",
        title: "Margin Discipline",
        content: `<div class="mb-6">
    <p class="text-[#343e47] mb-6">Margins define the safe zone for all communicative content and ensure consistency across all branded materials. Proper margin discipline creates breathing room, maintains legibility, and establishes visual hierarchy.</p>
    
    <h4 class="font-semibold text-[#343e47] mb-4">Standard Margins (All Formats)</h4>
    <div class="overflow-x-auto mb-6">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b-2 border-[#343E47]">
            <th class="text-left p-3 font-semibold text-[#343e47]">Margin Position</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">Measurement</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Top</td>
            <td class="p-3 font-light text-[#343e47]">0.375 in</td>
            <td class="p-3 font-light text-[#343e47]">Header clearance and breathing room</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Bottom</td>
            <td class="p-3 font-light text-[#343e47]">0.375 in</td>
            <td class="p-3 font-light text-[#343e47]">Footer clearance and page termination</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Left</td>
            <td class="p-3 font-light text-[#343e47]">0.375 in</td>
            <td class="p-3 font-light text-[#343e47]">Reading flow and binding consideration</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Right</td>
            <td class="p-3 font-light text-[#343e47]">0.375 in</td>
            <td class="p-3 font-light text-[#343e47]">Visual balance and text wrap protection</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Gutter</td>
            <td class="p-3 font-light text-[#343e47]">0.1667 in</td>
            <td class="p-3 font-light text-[#343e47]">Column separation and grid integrity</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h4 class="font-semibold text-[#343e47] mb-4">Margin Discipline Rules</h4>
    <div class="space-y-4 mb-6">
      <div class="bg-red-50 border-l-4 border-red-400 p-4">
        <h5 class="font-semibold text-[#343e47] mb-2">Strict Content Boundaries</h5>
        <ul class="list-none space-y-2 ml-0">
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>All copy/text must remain inside the margin boundaries</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>No headlines, paragraphs, or text blocks may break or touch the margin</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Icons, stats, and callouts must respect margin boundaries</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Tables and data visualizations cannot extend beyond margins without approval</span>
          </li>
        </ul>
      </div>

      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <h5 class="font-semibold text-[#343e47] mb-2">Approved Margin Extensions</h5>
        <ul class="list-none space-y-2 ml-0">
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Photography may extend beyond margins for visual impact</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Background overlays and color blocks (when intentional)</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Decorative Carenet brand marks (at 50% opacity)</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Essential Insights red footer blocks (in case studies)</span>
          </li>
        </ul>
      </div>

      <div class="bg-blue-50 border-l-4 border-blue-400 p-4">
        <h5 class="font-semibold text-[#343e47] mb-2">Quality Control Checklist</h5>
        <ul class="list-none space-y-2 ml-0">
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Verify all text aligns to column grid, not margin edges</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Check that extended elements don't interfere with legibility</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Ensure consistent margin application across multi-page documents</span>
          </li>
          <li class="text-[#343e47] flex items-start">
            <span class="text-[#DD1533] mr-2 mt-1">■</span>
            <span>Confirm gutter spacing maintains visual rhythm</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="bg-gray-50 rounded-lg p-6">
      <h5 class="font-semibold text-[#343e47] mb-3">Safe Zone Principle</h5>
      <p class="text-[#343e47] mb-4">Margins define the safe zone for all communicative content. This principle ensures that essential information remains accessible regardless of printing variations, screen sizes, or production tolerances.</p>
      <p class="text-[#343e47] mb-4">When in doubt, keep content within margins. Extensions should only occur when they serve a specific design purpose and have been approved by the Creative team.</p>
      <p class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-2 mt-1">📌</span>
        <span>See Section 2.13 for brand mark placement rules, which must also respect margin boundaries. For questions about margin exceptions, contact <a href="mailto:marketing@carenethealth.com" class="text-[#DD1533] hover:underline">marketing@carenethealth.com</a>.</span>
      </p>
    </div>
  </div>`,
      },
      {
        number: "4.4",
        title: "System-Wide Rules",
        content: `<div class="mb-6">
    <p class="text-[#343e47] mb-6">These fundamental rules govern all grid usage across Carenet's visual identity system. Adherence to these principles ensures consistency, professionalism, and visual integrity across every branded touchpoint.</p>

    <div class="space-y-6">
      <div class="border border-gray-200 rounded-lg p-6">
        <div class="flex items-start mb-4">
          <span class="bg-[#DD1533] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">01</span>
          <div>
            <h4 class="font-semibold text-[#343e47] mb-2">Grid Integrity</h4>
            <p class="text-[#343e47] mb-3">Never override the grid. No object, text box, or image should ignore gutters, columns, or rows. Any exception must be pre-approved by Creative.</p>
            <div class="bg-red-50 border-l-4 border-red-400 p-3">
              <p class="text-[#343e47] text-sm"><strong>Critical:</strong> Breaking the grid undermines visual consistency and brand recognition. If a design element doesn't fit the grid, redesign the element—don't break the system.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="border border-gray-200 rounded-lg p-6">
        <div class="flex items-start mb-4">
          <span class="bg-[#DD1533] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">02</span>
          <div>
            <h4 class="font-semibold text-[#343e47] mb-2">Baseline Alignment</h4>
            <p class="text-[#343e47] mb-3">Maintain baseline alignment. Text should sit on a consistent vertical rhythm grid, even across image overlays.</p>
            <ul class="list-none space-y-2 ml-0">
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Use consistent line spacing (16pt for body copy)</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Align text blocks to baseline grid across columns</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Maintain rhythm even when text overlays images</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="border border-gray-200 rounded-lg p-6">
        <div class="flex items-start mb-4">
          <span class="bg-[#DD1533] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">03</span>
          <div>
            <h4 class="font-semibold text-[#343e47] mb-2">Whitespace Discipline</h4>
            <p class="text-[#343e47] mb-3">Respect whitespace. Crowding is never acceptable. Use the grid to create natural spacing—not filler.</p>
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3">
              <p class="text-[#343e47] text-sm"><strong>Remember:</strong> Whitespace is not empty space—it's an active design element that improves readability and creates visual hierarchy.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="border border-gray-200 rounded-lg p-6">
        <div class="flex items-start mb-4">
          <span class="bg-[#DD1533] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">04</span>
          <div>
            <h4 class="font-semibold text-[#343e47] mb-2">Intentional Column Usage</h4>
            <p class="text-[#343e47] mb-3">Use full-column spans intentionally. For emphasis or hierarchy—not because it 'looks better.'</p>
            <ul class="list-none space-y-2 ml-0">
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Single column: Stats, callouts, icons</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Two columns: Short content blocks, pull quotes</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Three+ columns: Primary content, headlines</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="border border-gray-200 rounded-lg p-6">
        <div class="flex items-start mb-4">
          <span class="bg-[#DD1533] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">05</span>
          <div>
            <h4 class="font-semibold text-[#343e47] mb-2">Column 1 Rule</h4>
            <p class="text-[#343e47] mb-3">Always reserve Column 1 for icons, stats, and labels. Do not place body copy here.</p>
            <div class="overflow-x-auto">
              <table class="w-full border-collapse">
                <thead>
                  <tr class="border-b border-gray-300">
                    <th class="text-left p-2 text-sm font-semibold text-[#343e47]">Approved for Column 1</th>
                    <th class="text-left p-2 text-sm font-semibold text-[#343e47]">Not Approved</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-200">
                    <td class="p-2 text-sm text-[#343e47]">Section numbers (01., 02.)</td>
                    <td class="p-2 text-sm text-[#343e47]">Paragraph text</td>
                  </tr>
                  <tr class="border-b border-gray-200">
                    <td class="p-2 text-sm text-[#343e47]">Icons and visual elements</td>
                    <td class="p-2 text-sm text-[#343e47]">Headlines (unless specific template allows)</td>
                  </tr>
                  <tr class="border-b border-gray-200">
                    <td class="p-2 text-sm text-[#343e47]">Statistics and metrics</td>
                    <td class="p-2 text-sm text-[#343e47]">Body copy blocks</td>
                  </tr>
                  <tr>
                    <td class="p-2 text-sm text-[#343e47]">Labels and tags</td>
                    <td class="p-2 text-sm text-[#343e47]">Multi-line content</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="border border-gray-200 rounded-lg p-6">
        <div class="flex items-start mb-4">
          <span class="bg-[#DD1533] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">06</span>
          <div>
            <h4 class="font-semibold text-[#343e47] mb-2">Margin Rule</h4>
            <p class="text-[#343e47] mb-3">No copy should appear outside margin boundaries. Graphics may extend only when intentional and non-disruptive.</p>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-green-50 border border-green-200 rounded p-3">
                <h6 class="font-semibold text-green-800 mb-2">✓ Acceptable Extensions</h6>
                <ul class="text-sm text-green-700 space-y-1">
                  <li>• Photography backgrounds</li>
                  <li>• Color overlay blocks</li>
                  <li>• Decorative brand marks</li>
                  <li>• Essential Insights footers</li>
                </ul>
              </div>
              <div class="bg-red-50 border border-red-200 rounded p-3">
                <h6 class="font-semibold text-red-800 mb-2">✗ Never Extend</h6>
                <ul class="text-sm text-red-700 space-y-1">
                  <li>• Text content</li>
                  <li>• Headlines and subheads</li>
                  <li>• Icons and stats</li>
                  <li>• Tables and lists</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-blue-50 border-l-4 border-blue-400 p-6 mt-8">
      <h4 class="font-semibold text-[#343e47] mb-3">Enforcement and Exceptions</h4>
      <p class="text-[#343e47] mb-4">These rules exist to maintain brand integrity and visual consistency. While creative solutions are encouraged, they must work within the established system.</p>
      <p class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-2 mt-1">📌</span>
        <span>Any proposed exception to these system-wide rules requires approval from the Creative team at <a href="mailto:marketing@carenethealth.com" class="text-[#DD1533] hover:underline">marketing@carenethealth.com</a>.</span>
      </p>
    </div>
  </div>`,
      },
      {
          
         number: "4.5",
  title: "Advanced Grid Usage (Expanded)",
  content: `<div class="mb-6">
    <p class="text-[#343e47] mb-6">Advanced grid techniques allow for sophisticated layouts while maintaining system integrity. These guidelines ensure complex designs remain aligned with Carenet's visual standards.</p>

    <div class="space-y-6 mt-8">
      <div class="border border-gray-200 rounded-lg p-6">
        <div class="flex items-start mb-4">
          <span class="bg-[#DD1533] text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">01</span>
          <div>
            <h4 class="font-semibold text-[#343e47] mb-2">Section Numbering System</h4>
            <ul class="list-none space-y-1 ml-0 text-sm mb-2">
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Use two-digit numbers with a period (e.g., 01., 02.) at the start of each major section.</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Set in PP Neue Montreal Book or Roman.</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Align flush left to the margin or start of the content block.</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Maintain consistent spacing from top row. Never bold or stylize unnecessarily.</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Color for the numerals:</span>
              </li>
              <li class="text-[#343e47] flex items-start ml-4">
                <span class="text-[#DD1533] mr-2 mt-1">○</span>
                <span><strong>Headline:</strong> Numerals and accompanying text appear in Slate, with emphasized words highlighted in Crimson and styled in Haas Grotesk Medium.</span>
              </li>
              <li class="text-[#343e47] flex items-start ml-4">
                <span class="text-[#DD1533] mr-2 mt-1">○</span>
                <span><strong>Body copy:</strong> Crimson with the followed text to be slate. No crimson to emphasize words.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="border border-gray-200 rounded-lg p-6">
        <div class="flex items-start mb-4">
          <span class="bg-[#DD1533] text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">02</span>
          <div>
            <h4 class="font-semibold text-[#343e47] mb-2">Stat + Icon Column Block (1-Column Use)</h4>
            <p class="text-[#343e47] text-sm mb-4">This layout is used to highlight key metrics or descriptors alongside iconography, typically appearing in Column 1 only. It should follow strict alignment and formatting rules to maintain visual consistency and legibility across formats.</p>
            
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
              <p class="text-[#343e47] text-xs"><strong>When to Use:</strong> Use this block when visual emphasis or contrast is needed in layouts like eBooks and case studies. Do not use in whitepapers or one-pagers unless explicitly approved.</p>
            </div>

            <div class="space-y-4">
              <div class="border-l-4 border-red-400 pl-4">
                <h5 class="font-semibold text-[#343e47] text-xs mb-2">With Stat (Conditional)</h5>
                <ul class="list-none space-y-1 ml-0 text-xs">
                  <li class="text-[#343e47] flex items-start">
                    <span class="text-[#DD1533] mr-2 mt-1">■</span>
                    <span><strong>Top:</strong> White icon centered in a Crimson (#DD1533 / CMYK 10, 100, 78, 3) rounded square</span>
                  </li>
                  <li class="text-[#343e47] flex items-start">
                    <span class="text-[#DD1533] mr-2 mt-1">■</span>
                    <span><strong>Middle (Conditional):</strong> Stat or metric (e.g., "31% increase") in Slate (#343E47), bold, set in Neue Haas Grotesk Display – Medium, 15 pt size</span>
                  </li>
                  <li class="text-[#343e47] flex items-start">
                    <span class="text-[#DD1533] mr-2 mt-1">■</span>
                    <span><strong>Bottom:</strong> Descriptive label in Slate (#343E47), sentence case, set in PP Neue Montreal – Medium, between 9–10 pt size</span>
                  </li>
                  <li class="text-[#343e47] flex items-start">
                    <span class="text-[#DD1533] mr-2 mt-1">■</span>
                    <span><strong>Text Box:</strong> Should be flush left, rag right. May appear <strong>either</strong> below <strong>or</strong> to the right of the icon container—<strong>never both in the same column</strong></span>
                  </li>
                  <li class="text-[#343e47] flex items-start">
                    <span class="text-[#DD1533] mr-2 mt-1">■</span>
                    <span><strong>Alignment:</strong> Vertically stacked elements within a 1-column</span>
                  </li>
                  <li class="text-[#343e47] flex items-start">
                    <span class="text-[#DD1533] mr-2 mt-1">■</span>
                    <span><strong>Spacing:</strong> Maintain equal vertical padding above and below the icon and between each element</span>
                  </li>
                  <li class="text-[#343e47] flex items-start">
                    <span class="text-[#DD1533] mr-2 mt-1">■</span>
                    <span><strong>Tracking:</strong> Always set to 30</span>
                  </li>
                </ul>
                
                <div class="bg-red-50 border-l-4 border-red-400 p-3 mt-3 mb-3">
                  <p class="text-[#343e47] text-xs flex items-start">
                    <span class="text-red-500 mr-2 mt-1">⚠️</span>
                    <span><strong>Note:</strong> Do not mix icon styles (Crimson square vs. Slate-only icon) in a single composition. Use one style consistently.</span>
                  </p>
                </div>
                
                <div class="mt-3">
                  <p class="text-xs font-medium text-[#343e47] mb-2">Visual Reference:</p>
                  <div class="border border-gray-200 rounded-lg p-2 cursor-pointer hover:border-[#DD1533] transition-colors">
                    <img
                      src="https://carenethealthcare.com/wp-content/uploads/2025/06/Screenshot-2025-06-11-at-3.16.10 PM.png"
                      alt="Stat + Icon Column Block with stats example"
                      class="w-full max-w-xs mx-auto lightbox-image"
                    />
                  </div>
                </div>
              </div>

              <div class="border-l-4 border-blue-400 pl-4">
                <h5 class="font-semibold text-[#343e47] text-xs mb-2">Without Stat (No Conditional)</h5>
                <ul class="list-none space-y-1 ml-0 text-xs">
                  <li class="text-[#343e47] flex items-start">
                    <span class="text-[#DD1533] mr-2 mt-1">■</span>
                    <span><strong>Top:</strong> Icon may appear either inside a Crimson (#DD1533 / CMYK 10, 100, 78, 3) rounded square or standalone in Slate (#343E47)</span>
                  </li>
                  <li class="text-[#343e47] flex items-start">
                    <span class="text-[#DD1533] mr-2 mt-1">■</span>
                    <span><strong>Bottom:</strong> Descriptive text in Slate (#343E47), sentence case, set in PP Neue Montreal – Medium, between 9–10 pt size</span>
                  </li>
                  <li class="text-[#343e47] flex items-start">
                    <span class="text-[#DD1533] mr-2 mt-1">■</span>
                    <span><strong>Optional:</strong> For emphasis, the descriptor may be set in Crimson if the icon is Slate-dominant</span>
                  </li>
                  <li class="text-[#343e47] flex items-start">
                    <span class="text-[#DD1533] mr-2 mt-1">■</span>
                    <span><strong>Text Box:</strong> Should be flush left, rag right. May appear <strong>either</strong> below <strong>or</strong> to the right of the icon container—<strong>never both in the same column</strong></span>
                  </li>
                  <li class="text-[#343e47] flex items-start">
                    <span class="text-[#DD1533] mr-2 mt-1">■</span>
                    <span><strong>Alignment:</strong> Maintain equal vertical padding above and below the icon and appropriate spacing between elements</span>
                  </li>
                  <li class="text-[#343e47] flex items-start">
                    <span class="text-[#DD1533] mr-2 mt-1">■</span>
                    <span><strong>Tracking:</strong> Always set to 30</span>
                  </li>
                </ul>
                
                <div class="bg-red-50 border-l-4 border-red-400 p-3 mt-3 mb-3">
                  <p class="text-[#343e47] text-xs flex items-start">
                    <span class="text-red-500 mr-2 mt-1">⚠️</span>
                    <span><strong>Note:</strong> Do not mix icon styles (Crimson square vs. Slate-only icon) in a single composition. Use one style consistently.</span>
                  </p>
                </div>
                
                <div class="mt-3">
                  <p class="text-xs font-medium text-[#343e47] mb-2">Visual Reference:</p>
                  <div class="border border-gray-200 rounded-lg p-2 cursor-pointer hover:border-[#DD1533] transition-colors">
                    <img
                      src="https://carenethealthcare.com/wp-content/uploads/2025/06/Screenshot-2025-06-10-at-3.13.00 PM.png"
                      alt="Stat + Icon Column Block without stats example"
                      class="w-full max-w-xs mx-auto lightbox-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="border border-gray-200 rounded-lg p-6">
        <div class="flex items-start mb-4">
          <span class="bg-[#DD1533] text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">03</span>
          <div>
            <h4 class="font-semibold text-[#343e47] mb-2">Essential Insights + Red Footer Blocks</h4>
            <p class="text-[#343e47] text-sm">Used in case studies, whitepapers, and one-pagers as a summary anchor. Always placed within grid rows—usually bottom of the page or top of a section. Inside content follows 1–5 column modular layout. Padding: 12–16pt inside all sides. Text in Slate or white depending on background contrast. Do not center-align; all content should remain left-aligned.</p>
          </div>
        </div>
      </div>

      <div class="border border-gray-200 rounded-lg p-6">
        <div class="flex items-start mb-4">
          <span class="bg-[#DD1533] text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">04</span>
          <div>
            <h4 class="font-semibold text-[#343e47] mb-2">Stroke-Only Stat Boxes</h4>
            <p class="text-[#343e47] text-sm mb-2">Used when data needs to be clean and minimal:</p>
            <ul class="list-none space-y-1 ml-0 text-sm">
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Stroke: 1pt, Slate or Horizon tone only (never black)</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Shape: Square or rounded rectangle</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Content: Center-aligned</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Spacing: 16pt between stat blocks</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="border border-gray-200 rounded-lg p-6">
        <div class="flex items-start mb-4">
          <span class="bg-[#DD1533] text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">05</span>
          <div>
            <h4 class="font-semibold text-[#343e47] mb-2">Inline Highlighting Rules</h4>
            <ul class="list-none space-y-1 ml-0 text-sm mb-2">
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Font: PP Neue Montreal Semibold</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Size: 11pt</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Usage: For performance metrics only (e.g., $72 million, 81%, 5:1 ROI)</span>
              </li>
            </ul>
            <p class="text-[#343e47] text-sm"><strong>Important:</strong> Do not apply to full phrases or use Crimson for inline emphasis.</p>
          </div>
        </div>
      </div>

      <div class="border border-gray-200 rounded-lg p-6">
        <div class="flex items-start mb-4">
          <span class="bg-[#DD1533] text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">06</span>
          <div>
            <h4 class="font-semibold text-[#343e47] mb-2">Inline Subsection Headings</h4>
            <ul class="list-none space-y-1 ml-0 text-sm">
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Font: PP Neue Montreal Bold</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Size: 11pt</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Spacing: 16pt above and below</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>No tracking, no underlines</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="border border-gray-200 rounded-lg p-6">
        <div class="flex items-start mb-4">
          <span class="bg-[#DD1533] text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">07</span>
          <div>
            <h4 class="font-semibold text-[#343e47] mb-2">Overlayed Stat Boxes on Photography</h4>
            <ul class="list-none space-y-1 ml-0 text-sm mb-2">
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Stat overlays must align to the same 5-column grid structure</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Use either filled or stroke-only styles depending on contrast needs</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Text must remain legible over image backgrounds</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Avoid covering key subject matter unless intentional for design impact</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Apply appropriate background overlays to ensure readability</span>
              </li>
            </ul>
            <p class="text-[#343e47] text-sm"><strong>Note:</strong> Always test legibility across different devices and print formats.</p>
          </div>
        </div>
      </div>

      <div class="border border-gray-200 rounded-lg p-6">
        <div class="flex items-start mb-4">
          <span class="bg-[#DD1533] text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">08</span>
          <div>
            <h4 class="font-semibold text-[#343e47] mb-2">Vertical Rhythm / Modular Chunks</h4>
            <ul class="list-none space-y-1 ml-0 text-sm mb-2">
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Each section starts on a new grid row (no vertical bleeding between modules)</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Visual spacing between modules should follow row logic, not freeform spacing</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Never stack modules without at least 1-row buffer for breathing room</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Maintain consistent baseline alignment across all text elements</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Use modular chunks to create scannable content hierarchies</span>
              </li>
            </ul>
            <p class="text-[#343e47] text-sm"><strong>Goal:</strong> Create predictable visual rhythm that guides reader attention through the content.</p>
          </div>
        </div>
      </div>

      <div class="border border-gray-200 rounded-lg p-6">
        <div class="flex items-start mb-4">
          <span class="bg-[#DD1533] text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">09</span>
          <div>
            <h4 class="font-semibold text-[#343e47] mb-2">Decorative Mark Background Use</h4>
            <ul class="list-none space-y-1 ml-0 text-sm mb-2">
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Carenet brand marks may be used as low-opacity background elements (50% opacity, Multiply blend mode)</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Must stay within grid structure and respect margin boundaries</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Never interfere with text legibility or minimum clear space rules</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Position only in background roles: page corners, footers, behind section headers</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Size range: 0.18 in × 0.19 in (minimum) to 0.36 in × 0.37 in (maximum)</span>
              </li>
            </ul>
            <p class="text-[#343e47] text-sm"><strong>Important:</strong> Do not distort, recolor, rotate, or use the mark as a dominant foreground element.</p>
          </div>
        </div>
      </div>

      <div class="border border-gray-200 rounded-lg p-6">
        <div class="flex items-start mb-4">
          <span class="bg-[#DD1533] text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">10</span>
          <div>
            <h4 class="font-semibold text-[#343e47] mb-2">One-Pager & Whitepaper Specific Rules</h4>
            <ul class="list-none space-y-1 ml-0 text-sm mb-2">
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Bullet columns: Maintain even vertical spacing. Use grid gutter between dual columns.</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Header caps (e.g., STRATEGIC FOCUS AREAS): Set in PP Neue Montreal Bold, All Caps, Slate.</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>Rounded-corner tiles (e.g., stat boxes): Radius should be consistent (recommend: 12px).</span>
              </li>
              <li class="text-[#343e47] flex items-start">
                <span class="text-[#DD1533] mr-2 mt-1">■</span>
                <span>TOC in whitepapers: Use tile/card format; left-align all numbers and text to column grid.</span>
              </li>
            </ul>
            <p class="text-[#343e47] text-sm flex items-start">
              <span class="text-[#DD1533] mr-2 mt-1">📌</span>
              <span>Reference: For design execution, see Appendix visual examples or consult Creative.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>`,
}
},
  {
    number: "05",
  title: "Brand Voice & Messaging",
  overview:
    "Carenet Health's voice reflects who we are: an authoritative, human-first, tech-enabled partner in healthcare. Our tone is confident yet approachable, clear yet nuanced—always rooted in personal connection and measurable value. We speak to both decision-makers and frontline stakeholders with a tone that builds trust, educates clearly, and never overpromises.",
  subsections: [
    {
      number: "5.1",
      title: "Brand Voice Traits",
      content: `<div class="mb-6">
  <p class="text-[#343e47] mb-6">These traits define Carenet Health's overall brand voice and should guide all written and verbal communication—from marketing campaigns and social posts to internal presentations and client conversations.</p>

  <div class="overflow-x-auto mb-6">
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b-2 border-[#343E47]">
          <th class="text-left p-3 font-semibold text-[#343e47]">Trait</th>
          <th class="text-left p-3 font-semibold text-[#343e47]">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Authoritative</td>
          <td class="p-3 font-light text-[#343e47]">Grounded in expertise and experience—confident but never arrogant.</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Human</td>
          <td class="p-3 font-light text-[#343e47]">Emotionally aware and sincere. The voice should feel empathetic, not robotic.</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Tech-enabled</td>
          <td class="p-3 font-light text-[#343e47]">Forward-looking and informed by innovation, without leaning on empty buzzwords.</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Personal</td>
          <td class="p-3 font-light text-[#343e47]">Builds genuine connections—sounding relational, not promotional.</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Approachable</td>
          <td class="p-3 font-light text-[#343e47]">Smart and inviting, using plain language while avoiding overly casual tone.</td>
        </tr>
      </tbody>
    </table>
  </div>
    
  <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
    <p class="text-[#343e47] flex items-start">
      <span class="text-red-500 mr-2 mt-1">📌</span>
      <span>When ghostwriting or editing for executives or SMEs, their tone should be respected—but it must still align with Carenet's brand voice. Maintain clarity, warmth, and professionalism, even when adapting to individual contributors.</span>
    </p>
  </div>
</div>`,
    },
    {
      number: "5.2",
      title: "Channel-Specific Tone Guidance",
      content: `<div class="mb-6">
  <div class="overflow-x-auto mb-6">
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b-2 border-[#343E47]">
          <th class="text-left p-3 font-semibold text-[#343e47]">Channel</th>
          <th class="text-left p-3 font-semibold text-[#343e47]">Tone Shift & Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Website</td>
          <td class="p-3 font-light text-[#343e47]">Authoritative, educational, solution-oriented</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Whitepapers</td>
          <td class="p-3 font-light text-[#343e47]">Strategic, professional, thought leadership–driven tone with slightly elevated language</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">eBooks</td>
          <td class="p-3 font-light text-[#343e47]">Conversational, helpful, informative</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">One-Pagers</td>
          <td class="p-3 font-light text-[#343e47]">Direct, high-impact, informative</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Case Studies</td>
          <td class="p-3 font-light text-[#343e47]">Balanced: expert but human, performance-driven without being salesy</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Social Media</td>
          <td class="p-3 font-light text-[#343e47]">Non-salesy, personable, creative, warm — room for playfulness as long as it aligns with tone</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Digital Ads</td>
          <td class="p-3 font-light text-[#343e47]">Clear, non-salesy, personalized to pain points, never clickbait-y</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
    <p class="text-[#343e47] flex items-start">
      <span class="text-red-500 mr-2 mt-1">📌</span>
      <span><em>Note: For words and tone styles to avoid across all channels, see "Global Language Cautions" below.</em></span>
    </p>
  </div>
  
  <h4 class="font-semibold text-[#343e47] mb-4 text-lg">Global Language Cautions</h4>
  
  <p class="text-[#343e47] mb-4">These rules apply <strong>across all content types and channels</strong>, regardless of audience or format.</p>
  
  <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
    <p class="text-[#343e47] font-semibold mb-3">Important Note:</p>
    <p class="text-[#343e47] mb-4">Avoid AI-generated tone markers—such as overuse of em dashes, generic buzzwords, or overly polished phrasing. AI can assist with drafting, but the final output must be reviewed through the lens of:</p>
    <ul class="list-disc ml-6 mb-4 text-[#343e47]">
      <li>Our brand voice</li>
      <li>The audience's needs</li>
      <li>The channel's purpose</li>
    </ul>
    <p class="text-[#343e47] font-medium">If it reads like it was written by AI, it shouldn't go out.</p>
  </div>
  
  <div class="mb-4">
    <p class="text-[#343e47] font-semibold mb-3 flex items-center">
      <span class="text-red-500 mr-2">🚫</span>
      Avoid terms like:
    </p>
    <ul class="list-disc ml-6 space-y-1 text-[#343e47]">
      <li>Unlock</li>
      <li>Empower</li>
      <li>Discover</li>
      <li>Revolutionize</li>
      <li>Game-changing</li>
      <li>Cutting-edge</li>
    </ul>
    <p class="text-[#343e47] mt-3">...and avoid phrases padded with passive, hype-driven framing.</p>
  </div>
</div>`,
    },
    {
      number: "5.3",
      title: "Messaging Principles",
      content: `<div class="mb-6">
  <div class="overflow-x-auto mb-6">
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b-2 border-[#343E47]">
          <th class="text-left p-3 font-semibold text-[#343e47]">Principle</th>
          <th class="text-left p-3 font-semibold text-[#343e47]">What It Means</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Lead with value, not vanity</td>
          <td class="p-3 font-light text-[#343e47]">Focus on outcomes and insights—not the brand or ego.</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Speak to people, not personas</td>
          <td class="p-3 font-light text-[#343e47]">Write like you're solving a real problem for a real person.</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Use plain language with depth</td>
          <td class="p-3 font-light text-[#343e47]">Be clear and straightforward—never generic, never dumbed down.</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Stay channel-conscious</td>
          <td class="p-3 font-light text-[#343e47]">The format matters. A CTA on social isn't a paragraph in a whitepaper.</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Respect the reader's time</td>
          <td class="p-3 font-light text-[#343e47]">Be concise. If it doesn't add clarity or connection, cut it.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`,
    },
    {
      number: "5.4",
      title: "Key Messaging Framework",
      content: `<div class="mb-6">
  <h4 class="font-semibold text-[#343e47] mb-3">How to Use This Framework:</h4>
  <p class="text-[#343e47] mb-6">These messaging types are the building blocks of Carenet's brand narrative. They are designed for use across formats—such as websites, marketing campaigns, sales decks, and executive communications—to clearly articulate value, build trust, and reinforce our positioning. Choose the type(s) that fit the context and audience need. Not all types are required at once.</p>

  <div class="overflow-x-auto mb-6">
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b-2 border-[#343E47]">
          <th class="text-left p-3 font-semibold text-[#343e47]">Message Type</th>
          <th class="text-left p-3 font-semibold text-[#343e47]">Purpose</th>
          <th class="text-left p-3 font-semibold text-[#343e47]">Example</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Positioning Line</td>
          <td class="p-3 font-light text-[#343e47]">Define who we are succinctly</td>
          <td class="p-3 font-light text-[#343e47]">Powering the business of healthcare.</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Proof Point</td>
          <td class="p-3 font-light text-[#343e47]">Support claims with outcomes</td>
          <td class="p-3 font-light text-[#343e47]">Organizations using our platform reduced manual steps by 28% in 90 days.</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Value Proposition</td>
          <td class="p-3 font-light text-[#343e47]">What the audience gains from us</td>
          <td class="p-3 font-light text-[#343e47]">We simplify workflows, improve ROI, and protect margins.</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Challenge Framing</td>
          <td class="p-3 font-light text-[#343e47]">Show we understand their pain</td>
          <td class="p-3 font-light text-[#343e47]">Payers and providers are expected to do more—with less.</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Call to Action</td>
          <td class="p-3 font-light text-[#343e47]">Invite engagement, not clicks</td>
          <td class="p-3 font-light text-[#343e47]">See how we deliver outcomes—not just impressions.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`,
    },
    {
      number: "5.5",
      title: "Writing Style Guidelines",
      content: `<div class="mb-6">
  <p class="text-[#343e47] mb-6">These rules apply to all internal and external-facing content, including marketing, sales, and communications. The goal is to create writing that's clear, professional, and human—with just the right amount of personality.</p>

  <div class="overflow-x-auto mb-6">
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b-2 border-[#343E47]">
          <th class="text-left p-3 font-semibold text-[#343e47]">Element</th>
          <th class="text-left p-3 font-semibold text-[#343e47]">Guideline</th>
          <th class="text-left p-3 font-semibold text-[#343e47]">Example / Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Sentence Length</td>
          <td class="p-3 font-light text-[#343e47]">Mix short and medium-length sentences to create rhythm and avoid fatigue. Do not default to long-winded explanations.</td>
          <td class="p-3 font-light text-[#343e47]">Instead of: "Our goal is to provide solutions that..." → Try: "We help you move faster. Smarter."</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Tone</td>
          <td class="p-3 font-light text-[#343e47]">Use a professional voice that includes warmth and clarity—never fluff, sarcasm, or fake enthusiasm.</td>
          <td class="p-3 font-light text-[#343e47]">Feels direct, human, and calm. Not overhyped.</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Pronouns</td>
          <td class="p-3 font-light text-[#343e47]">Favor "you," "we," and "your team." Avoid passive language or generic third-person references.</td>
          <td class="p-3 font-light text-[#343e47]"><span class="text-green-600">✓</span> "We help your team streamline care." <span class="text-red-600">🚫</span> "Organizations should strive to streamline workflows."</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Punctuation</td>
          <td class="p-3 font-light text-[#343e47]">Use periods. Avoid excessive punctuation (e.g., em dashes, exclamations). Emphasize clarity over drama.</td>
          <td class="p-3 font-light text-[#343e47]"><span class="text-green-600">✓</span> "Let's look at the results." <span class="text-red-600">🚫</span> "Let's look at the results—finally!"</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Formatting</td>
          <td class="p-3 font-light text-[#343e47]">Use subheads, bulleted lists, and whitespace to guide the reader. Never bury key information in walls of text.</td>
          <td class="p-3 font-light text-[#343e47]">Especially important for eBooks, blogs, and emails.</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Casing</td>
          <td class="p-3 font-light text-[#343e47]">Use sentence case for all titles, headlines, and subheads—unless explicitly defined by a template (e.g., all caps stat headers in one-pagers).</td>
          <td class="p-3 font-light text-[#343e47]"><span class="text-green-600">✓</span> "Our solution overview" <span class="text-red-600">🚫</span> "OUR SOLUTION OVERVIEW" (unless approved in template design)</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`,
    },
    {
      number: "5.6",
      title: "Brand Voice in Action: What to Say vs. What to Avoid",
      content: `<div class="mb-6">
  <p class="text-[#343e47] mb-4">This section shows how Carenet's brand voice translates into real messaging. It provides examples of tone, word choice, and phrasing that reflect our approved traits—authoritative, human, tech-enabled, personal, and approachable—while flagging common pitfalls to avoid.</p>
  
  <p class="text-[#343e47] mb-6 font-medium">Use this as a filter for reviewing campaign copy, emails, landing pages, ads, social media, or executive communications.</p>

  <div class="overflow-x-auto mb-6">
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b-2 border-[#343E47]">
          <th class="text-left p-3 font-semibold text-[#343e47]"><span class="text-green-600">✓</span> Say This</th>
          <th class="text-left p-3 font-semibold text-[#343e47]"><span class="text-red-600">🚫</span> Avoid This</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-light text-[#343e47]"><strong>Smarter healthcare starts with stronger connections.</strong> (Direct, clear, relational)</td>
          <td class="p-3 font-light text-[#343e47]"><strong>We're a best-in-class engagement provider that transforms care outcomes.</strong> (Buzzword-heavy, vague)</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-light text-[#343e47]"><strong>Let's simplify care access—together.</strong> (Collaborative, inviting)</td>
          <td class="p-3 font-light text-[#343e47]"><strong>We solve the complexities of care with innovative omnichannel solutions.</strong> (Jargon, corporate tone)</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-light text-[#343e47]"><strong>We handle the outreach, so your teams can stay focused.</strong> (Supportive, practical)</td>
          <td class="p-3 font-light text-[#343e47]"><strong>End-to-end optimization of engagement workflows at scale.</strong> (Impersonal, overly technical)</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-light text-[#343e47]"><strong>Real people. Real conversations. Real results.</strong> (Human, rhythmic, emotive)</td>
          <td class="p-3 font-light text-[#343e47]"><strong>Carenet empowers stakeholders to achieve improved metrics.**</strong> (Abstract, non-human)</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-light text-[#343e47]"><strong>Backed by data. Powered by people.**</strong> (Balanced, tech + human)</td>
          <td class="p-3 font-light text-[#343e47]"><strong>AI-driven touchpoint orchestration across verticals.**</strong> (Overly technical, no clear meaning)</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`,
    },
    {
      number: "5.7",
      title: "Voice by Asset",
      content: `<div class="mb-6">
  <p class="text-[#343e47] mb-4">Each core asset type at Carenet has a distinct voice and structural purpose. The tone, rhythm, and emphasis should flex slightly based on format—but always remain rooted in our brand voice: confident, strategic, approachable, and focused on value.</p>
  
  <p class="text-[#343e47] mb-6">Use the chart below to guide writing style, page length, and tone expectations for the most commonly used asset types.</p>

  <div class="overflow-x-auto mb-6">
    <table class="w-full border-collapse">
      <thead>
        <tr class="border-b-2 border-[#343E47]">
          <th class="text-left p-3 font-semibold text-[#343e47]">Asset Type</th>
          <th class="text-left p-3 font-semibold text-[#343e47]">Voice Style</th>
          <th class="text-left p-3 font-semibold text-[#343e47]">Page Range</th>
          <th class="text-left p-3 font-semibold text-[#343e47]">Execution Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">eBook</td>
          <td class="p-3 font-light text-[#343e47]">Structured, confident, not cluttered</td>
          <td class="p-3 font-light text-[#343e47]"><em>8–12 pages</em></td>
          <td class="p-3 font-light text-[#343e47]">Copy uses soft authority to educate and build trust. Avoid promotional tone. Leverage whitespace, visuals, and stat + icon blocks to improve pacing and scanability. Prioritize helpful tone over positioning.</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Whitepaper</td>
          <td class="p-3 font-light text-[#343e47]">Strategic, layered, no fluff</td>
          <td class="p-3 font-light text-[#343e47]"><em>6–10 pages</em></td>
          <td class="p-3 font-light text-[#343e47]">Maintain an expert tone—no hyperbole or sales speak. Use formal structure and supporting data. Emphasize clarity, organization, and visual breathing room.</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">Case Study</td>
          <td class="p-3 font-light text-[#343e47]">Clear, performance-driven, human</td>
          <td class="p-3 font-light text-[#343e47]"><em>2–3 pages</em></td>
          <td class="p-3 font-light text-[#343e47]">Minimize intro copy and focus on outcomes. Use data to support impact. Prioritize high stat visibility and insights over narrative. Include human elements where relevant, but never distract from results.</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="p-3 font-medium text-[#343e47]">One-Pager</td>
          <td class="p-3 font-light text-[#343e47]">Bold, high-impact, direct</td>
          <td class="p-3 font-light text-[#343e47]"><em>1 page only</em></td>
          <td class="p-3 font-light text-[#343e47]">Copy should be punchy, minimal, and results-driven. Use stat + icon blocks for emphasis. Avoid cluttered layouts or long paragraphs. Structure top-down with a strong CTA or insight anchor.</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
    <p class="text-[#343e47] font-semibold mb-2 flex items-start">
      <span class="text-yellow-600 mr-2 mt-1">💡</span>
      <span>Let the problem lead the message—not the brand.</span>
    </p>
    <p class="text-[#343e47]">Always speak to a real challenge with clarity and purpose. If it doesn't solve something, reframe it.</p>
  </div>
</div>`,
    },
  ],
}
  {
    number: "06",
  title: "Iconography",
  overview:
    "Carenet's icon system reinforces structure and meaning across all branded content. Icons are used to elevate clarity—not decoration—and follow strict standards around stroke, scaling, and color usage. Every icon is built to align with adjacent typography, contribute to visual hierarchy, and remain consistent across formats and applications.",
  subsections: [
    {
      number: "6.1",
      title: "Icon System Principles",
      content: `<div class="mb-6">
    <p class="text-[#343e47] mb-4">Carenet's iconography is rooted in clarity, consistency, and functional purpose. Icons are never decorative—they are designed to communicate quickly, highlight key takeaways, and reinforce brand cohesion across formats.</p>
    
    <p class="text-[#343e47] mb-4">All icons are built using a stroke-based style that reflects our minimal, professional aesthetic. They must follow brand stroke weight, color, and proportional scaling rules and always align visually with surrounding typography and layout structure.</p>
    
    <p class="text-[#343e47] mb-6">Icons may appear inside Crimson-filled rounded squares in certain applications like stat callouts or reverse blocks—but the icon itself must never be filled. All strokes must remain open, balanced, and scalable.</p>
    
    <h4 class="font-semibold text-[#343e47] mb-3">When used inside a Crimson rounded square</h4>
    
    <ul class="list-disc ml-6 space-y-2 mb-6 text-[#343e47]">
      <li>Icons must be visually centered and scaled proportionately to allow breathing room.</li>
      <li>Never let the icon touch the edges or appear oversized.</li>
      <li>Icons must align with surrounding typography and maintain equal vertical padding.</li>
      <li>Use only white icons on Crimson (#DD1533 / CMYK 10, 100, 78, 3) square backgrounds.</li>
    </ul>
    
    <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
      <p class="text-[#343e47] flex items-start">
        <span class="text-red-500 mr-2 mt-1">📌</span>
        <span>For stroke specs, scaling, and spacing rules, see [Section 6.6].</span>
      </p>
    </div>
  </div>`,
    },
    {
      number: "6.2",
      title: "Where Icons Are Used",
      content: `<div class="mb-6">
    <p class="text-[#343e47] mb-6">Carenet's icon system is applied across virtually all branded touchpoints to support communication, simplify scanability, and create visual rhythm. However, proper usage must follow brand styling, proportion, and contextual alignment rules.</p>

    <div class="overflow-x-auto mb-6">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b-2 border-[#343E47]">
            <th class="text-left p-3 font-semibold text-[#343e47]"><span class="text-green-600">✓</span> Approved Uses</th>
            <th class="text-left p-3 font-semibold text-[#343e47]"><span class="text-red-600">🚫</span> Misuses to Avoid</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-light text-[#343e47]">Infographics and stat callouts</td>
            <td class="p-3 font-light text-[#343e47]">Icons used decoratively without functional meaning</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-light text-[#343e47]">One-pagers and whitepapers (supporting visuals only)</td>
            <td class="p-3 font-light text-[#343e47]">Icons placed as metaphors (e.g., puzzle pieces, ladders)</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-light text-[#343e47]">Case studies and eBooks</td>
            <td class="p-3 font-light text-[#343e47]">Floating icons with no grid or alignment</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-light text-[#343e47]">Internal and external slide decks</td>
            <td class="p-3 font-light text-[#343e47]">Icons placed above headers as standalone decoration</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-light text-[#343e47]">Social media content</td>
            <td class="p-3 font-light text-[#343e47]">Mixing solid and stroke styles inconsistently</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-light text-[#343e47]">Web, digital ads, and print collateral</td>
            <td class="p-3 font-light text-[#343e47]">Using icons that don't follow stroke weight or color rules</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-light text-[#343e47]">Executive presentations</td>
            <td class="p-3 font-light text-[#343e47]">Overuse in formal documents like whitepapers</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-light text-[#343e47]">Data visualization overlays</td>
            <td class="p-3 font-light text-[#343e47]">Swapping icons mid-series for novelty</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-light text-[#343e47]">Programmatic campaign visuals</td>
            <td class="p-3 font-light text-[#343e47]">Using unapproved third-party icons or clip art</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
      <p class="text-[#343e47] flex items-start">
        <span class="text-red-500 mr-2 mt-1">📌</span>
        <span><strong>Note:</strong> If in doubt, assume iconography is allowed—but all usage must adhere to brand styling and proportion rules. When in conflict, consult the Creative Team.</span>
      </p>
    </div>
  </div>`,
    },
    {
      number: "6.3",
      title: "Color Application Rules",
      content: `<div class="mb-6">
    <p class="text-[#343e47] mb-6">Carenet's icon system uses color intentionally to enhance visual communication without overwhelming design. All icon colors must adhere to the rules outlined below.</p>

    <h4 class="font-semibold text-[#343e47] mb-3 flex items-center">
      <span class="text-green-600 mr-2">✓</span>
      Approved Usage
    </h4>
    <div class="overflow-x-auto mb-6">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b-2 border-[#343E47]">
            <th class="text-left p-3 font-semibold text-[#343e47]">Component</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">Rule</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Stroke Color</td>
            <td class="p-3 font-light text-[#343e47]">Slate (#343E47 / Pantone 432C / CMYK 77, 64, 53, 44) is the default stroke</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Accent Detail</td>
            <td class="p-3 font-light text-[#343e47]">Crimson (#DD1533 / Pantone 199C / CMYK 10, 100, 78, 3) may highlight one part only</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Reverse Treatment</td>
            <td class="p-3 font-light text-[#343e47]">On dark or Crimson backgrounds, both the stat and icon must appear in white</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Arrow Icons</td>
            <td class="p-3 font-light text-[#343e47]">May appear fully Crimson, Slate, or White depending on contrast needs</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h4 class="font-semibold text-[#343e47] mb-3 flex items-center">
      <span class="text-red-600 mr-2">🚫</span>
      Do Not
    </h4>
    <div class="overflow-x-auto mb-6">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b-2 border-[#343E47]">
            <th class="text-left p-3 font-semibold text-[#343e47]">Violation</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">Rule</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Horizon misuse</td>
            <td class="p-3 font-light text-[#343e47]">Never use Horizon (#C3E3ED) as a stroke or fill for any icon</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Over-accenting</td>
            <td class="p-3 font-light text-[#343e47]">Never apply more than one Crimson accent per icon</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Poor contrast</td>
            <td class="p-3 font-light text-[#343e47]">Never use Slate on Slate or low-contrast combinations</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h4 class="font-semibold text-[#343e47] mb-3 flex items-center">
      <span class="text-gray-600 mr-2">⚫</span>
      Special Conditions for Crimson Containers
    </h4>
    <p class="text-[#343e47] mb-3">If an icon is placed inside a <strong>Crimson rounded square:</strong></p>
    <ul class="list-disc ml-6 space-y-2 mb-6 text-[#343e47]">
      <li>The icon must be <strong>white, centered</strong>, and <strong>never oversized or touching the edges</strong></li>
      <li>Icon should maintain visual balance and breathing room</li>
    </ul>

    <h4 class="font-semibold text-[#343e47] mb-3 flex items-center">
      <span class="text-gray-600 mr-2">⚖️</span>
      Stat + Icon Pairing Reminders
    </h4>
    <ul class="list-disc ml-6 space-y-2 mb-6 text-[#343e47]">
      <li><strong>Stat is primary:</strong> Icons must complement—not compete—with the metric</li>
      <li><strong>Spacing:</strong> Maintain consistent vertical spacing between icon and stat</li>
      <li><strong>Typography:</strong> Stats must follow the type rules in Section 2.9 (Neue Haas Grotesk Display – Medium, 15 pt, tracking 30)</li>
    </ul>
  </div>`,
    },
    {
       number: "6.4",
        title: "Stat + Icon Pairing Guidelines",
        content: `<div class="mb-6">
    <p class="text-[#343e47] mb-4">When pairing icons with statistics, visual hierarchy and alignment must be respected. The stat is the primary element. The icon exists to reinforce—not distract from—the data. Usage must follow brand type, spacing, and layout rules across all formats.</p>
    
    <p class="text-[#343e47] mb-6">This block appears primarily in <strong>eBooks</strong> and <strong>case studies</strong>. It should not be used in whitepapers or one-pagers unless explicitly approved.</p>

    <div class="flex items-center gap-2 mb-4">
      <div class="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
        <span class="text-white text-xs font-bold">✓</span>
      </div>
      <h4 class="font-semibold text-[#343e47]">Do / Don't Table</h4>
    </div>

    <div class="overflow-x-auto mb-6">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b-2 border-[#343E47]">
            <th class="text-left p-3 font-semibold text-[#343e47]">Aspect</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">Do</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">Don't</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Usage</td>
            <td class="p-3 font-light text-[#343e47]">Use only in eBooks and case studies. Stat must be the visual anchor, icon reinforces.</td>
            <td class="p-3 font-light text-[#343e47]">Don't use in whitepapers or one-pagers unless explicitly approved.</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Icon Setup</td>
            <td class="p-3 font-light text-[#343e47]">White icon centered in a Crimson (#DD1533 / CMYK 10, 100, 78, 3) rounded square with equal vertical padding.</td>
            <td class="p-3 font-light text-[#343e47]">Don't mix rounded-square icons with standalone icons in a single layout. Never stretch or skew icons.</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Stat Setup</td>
            <td class="p-3 font-light text-[#343e47]">Slate (#343E47) number (e.g., "400") in Neue Haas Grotesk Display – Medium, 15 pt. Conditional: Only shown when a metric exists.</td>
            <td class="p-3 font-light text-[#343e47]">Don't overlay text into icons or use baked-in stats unless pre-approved.</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Label Setup</td>
            <td class="p-3 font-light text-[#343e47]">Descriptor in Slate (#343E47), sentence case, set in <strong>PP Neue Montreal – Medium</strong>, 9–10 pt size.</td>
            <td class="p-3 font-light text-[#343e47]">Don't use inconsistent fonts, sizes, or colors.</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Text Alignment</td>
            <td class="p-3 font-light text-[#343e47]">Text box should be flush left, rag right. May sit either <strong>below</strong> or <strong>to the right</strong> of the icon container—<strong>never both</strong>.</td>
            <td class="p-3 font-light text-[#343e47]">Don't center-align text or position text on multiple sides of the icon.</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Tracking</td>
            <td class="p-3 font-light text-[#343e47]">Set to <strong>30</strong> across all stat and label text.</td>
            <td class="p-3 font-light text-[#343e47]">Don't override tracking or apply custom kerning.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex items-center gap-2 mb-4">
      <h4 class="font-semibold text-[#343e47]">Visual Reference</h4>
    </div>

    <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
      <h5 class="font-medium text-[#343e47] mb-2">Do Example – Stat + Icon</h5>
      <p class="text-[#343e47] italic mb-4">Example of approved stat + icon pairing. Stat is the visual anchor. Icon follows spacing and proportion rules.</p>
      
      <div class="border border-gray-200 rounded-lg p-2 cursor-pointer hover:border-[#DD1533] transition-colors">
        <img
          src="https://carenethealthcare.com/wp-content/uploads/2025/06/Screenshot-2025-06-14-at-2.46.45 PM.png"
          alt="Do Example - Stat + Icon pairing showing proper hierarchy and spacing"
          class="w-full h-56 mx-auto object-contain lightbox-image"
        />
      </div>
    </div>
  </div>`,
    },
    {
      number: "6.5",
  title: "Business Unit Icon System",
  content: `<div class="mb-6">
    <p class="text-[#343e47] mb-4">Carenet uses custom shape-based marks to visually reinforce its key business units. These are not used as literal icons, but as background graphic elements to anchor layouts and support design identity.</p>
    
    <p class="text-[#343e47] mb-4">These business unit icons should never float in space. Each quadrant must align flush to a layout edge, acting as a grounding element—not a focal point. Curved or shaped edges should always face inward. Use subtly and sparingly.</p>
    
    <p class="text-[#343e47] mb-6">Each business unit uses a distinct geometric shape—divided into four equal parts—to anchor layouts and visually reinforce brand identity. Designers should only use one quadrant of the shape at a time, placed flush to a layout corner. Shapes should never be centered, rotated, or float freely.</p>

    <div class="overflow-x-auto mb-6">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b-2 border-[#343E47]">
            <th class="text-left p-3 font-semibold text-[#343e47]">BU Name</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">Shape</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">Visual Reference</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">Placement Rule</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">Symbolic Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Access & Acquisition</td>
            <td class="p-3 font-light text-[#343e47]">Circle</td>
            <td class="p-3 font-light text-[#343e47]">
              <div class="border border-gray-200 rounded p-2 cursor-pointer hover:border-[#DD1533] transition-colors inline-block">
                <img
                  src="https://carenethealthcare.com/wp-content/uploads/2025/06/Screenshot-2025-06-14-at-5.13.18 PM.png"
                  alt="Access & Acquisition Circle Icon Example"
                  class="h-16 w-auto object-contain lightbox-image"
                />
              </div>
            </td>
            <td class="p-3 font-light text-[#343e47]">Use ¼ of the shape, anchored to any canvas corner</td>
            <td class="p-3 font-light text-[#343e47]">Human <span class="text-[#DD1533]">connection</span>; shape represents a head in conversation</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Care Management</td>
            <td class="p-3 font-light text-[#343e47]">Cross</td>
            <td class="p-3 font-light text-[#343e47]">
              <div class="border border-gray-200 rounded p-2 cursor-pointer hover:border-[#DD1533] transition-colors inline-block">
                <img
                  src="https://carenethealthcare.com/wp-content/uploads/2025/06/Screenshot-2025-06-14-at-5.13.08 PM.png"
                  alt="Care Management Cross Icon Example"
                  class="h-16 w-auto object-contain lightbox-image"
                />
              </div>
            </td>
            <td class="p-3 font-light text-[#343e47]">Use ¼ of the shape, anchored to any canvas corner</td>
            <td class="p-3 font-light text-[#343e47]">Medical care and trust; universal healthcare symbol</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Healthcare BPO</td>
            <td class="p-3 font-light text-[#343e47]">Diamond</td>
            <td class="p-3 font-light text-[#343e47]">
              <div class="border border-gray-200 rounded p-2 cursor-pointer hover:border-[#DD1533] transition-colors inline-block">
                <img
                  src="https://carenethealthcare.com/wp-content/uploads/2025/06/Screenshot-2025-06-14-at-5.13.29 PM.png"
                  alt="Healthcare BPO Diamond Icon Example"
                  class="h-16 w-auto object-contain lightbox-image"
                />
              </div>
            </td>
            <td class="p-3 font-light text-[#343e47]">Use ¼ of the shape, anchored to any canvas corner</td>
            <td class="p-3 font-light text-[#343e47]">Fluidity and global outsourcing; directional balance across systems</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Pharmacy</td>
            <td class="p-3 font-light text-[#343e47]">Pill (capsule)</td>
            <td class="p-3 font-light text-[#343e47]">
              <div class="border border-gray-200 rounded p-2 cursor-pointer hover:border-[#DD1533] transition-colors inline-block">
                <img
                  src="https://carenethealthcare.com/wp-content/uploads/2025/06/Screenshot-2025-06-14-at-5.37.49 PM.png"
                  alt="Pharmacy Pill Icon Example"
                  class="h-16 w-auto object-contain lightbox-image"
                />
              </div>
            </td>
            <td class="p-3 font-light text-[#343e47]">Use ¼ of the shape, anchored to any canvas corner</td>
            <td class="p-3 font-light text-[#343e47]">Medication access and pharmacy services</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Launch</td>
            <td class="p-3 font-light text-[#343e47]">Vertical Rectangle</td>
            <td class="p-3 font-light text-[#343e47]">
              <div class="border border-gray-200 rounded p-2 cursor-pointer hover:border-[#DD1533] transition-colors inline-block">
                <img
                  src="https://carenethealthcare.com/wp-content/uploads/2025/06/Screenshot-2025-06-14-at-5.17.37 PM.png"
                  alt="Launch Vertical Rectangle Icon Example"
                  class="h-16 w-auto object-contain lightbox-image"
                />
              </div>
            </td>
            <td class="p-3 font-light text-[#343e47]">Use ¼ of the shape, anchored to any canvas corner</td>
            <td class="p-3 font-light text-[#343e47]">Multilingual communication, screen-based interaction (e.g., smartphone-inspired)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
      <p class="text-[#343e47] flex items-start">
        <span class="text-red-500 mr-2 mt-1">📌</span>
        <span>These shapes must always be anchored to a layout edge—never floating, centered, or rotated. See Appendix for placement examples.</span>
      </p>
    </div>
  </div>`,
    },
    {
      number: "6.6",
  title: "Style and Scaling Rules",
  content: `<div class="mb-6">
    <p class="text-[#343e47] mb-4">Icons must be created or scaled within a 491 × 491 px artboard. The stroke width within that space must be 13pt.</p>
    
    <ul class="list-none space-y-2 ml-0 mb-6">
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Always enable "Scale Strokes & Effects" and "Scale Corners" in Adobe Illustrator when resizing/creating icons
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        If stroke alignment becomes inconsistent, convert strokes to outlines before resizing
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Icons must remain visually balanced and consistent with adjacent typography
      </li>
    </ul>

    <h4 class="font-semibold text-[#343e47] mb-3">Rounded Square Background Rule</h4>
    <p class="text-[#343e47] mb-4">When placing icons inside the Carenet brand mark's rounded square background, the corner radius must scale proportionally to maintain brand consistency.</p>
    
    <div class="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
      <p class="text-[#343e47] mb-2"><strong>Use the formula to determine the corner radius of your square:</strong></p>
      <p class="text-[#343e47] mb-4 font-mono bg-white p-2 rounded border">Corner Radius = Square Width × 0.121633</p>
      <p class="text-[#343e47] text-sm"><strong>📌 Example (Prime Formula):</strong> 100px × 100px square, the correct corner radius is 12.1633px</p>
      <p class="text-[#343e47] text-sm mt-2 italic">This ensures the radius stays consistent and proportional no matter the square's size.</p>
    </div>
  </div>`,
    },
    {
      number: "6.7",
  title: "Icon Usage Restrictions",
  content: `<div class="mb-6">
    <p class="text-[#343e47] mb-6">To maintain consistency, clarity, and brand cohesion across all formats, the following behaviors are strictly <strong>prohibited</strong>:</p>
    
    <div class="overflow-x-auto mb-6">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b-2 border-[#343E47]">
            <th class="text-left p-3 font-semibold text-[#343e47]"><span class="text-red-600">🚫</span> Violation</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">Why It's Prohibited</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Recoloring icons outside the Slate / Crimson / White system</td>
            <td class="p-3 font-light text-[#343e47]">Introduces visual inconsistency and breaks brand recognition</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Applying shadows, gradients, or 3D effects</td>
            <td class="p-3 font-light text-[#343e47]">Conflicts with the flat, stroke-based design standard</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Stretching or distorting icon dimensions</td>
            <td class="p-3 font-light text-[#343e47]">Destroys proportions, visual integrity, and grid alignment</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Embedding text or custom fonts into icon artwork</td>
            <td class="p-3 font-light text-[#343e47]">Breaks typography system and reduces accessibility</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Using clipart, stock icons, or inconsistent third-party assets</td>
            <td class="p-3 font-light text-[#343e47]">Undermines brand quality and professional tone</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Breaking stroke weight or radius consistency</td>
            <td class="p-3 font-light text-[#343e47]">Results in unbalanced or mismatched icon appearance</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Mixing icon styles (e.g., flat + filled, stroke + solid)</td>
            <td class="p-3 font-light text-[#343e47]">Causes aesthetic conflict and reduces visual cohesion</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
      <p class="text-[#343e47] flex items-start">
        <span class="text-red-500 mr-2 mt-1">📌</span>
        <span><strong>Note:</strong></span>
      </p>
      <p class="text-[#343e47] mt-2">Always reference approved icons or contact <a href="mailto:marketing@carenethealth.com" class="text-[#DD1533] hover:underline">marketing@carenethealth.com</a> before creating, modifying, or submitting new icon requests.</p>
    </div>
  </div>`,
    ],
  },
  {
    number: "07",
    title: "Misuse & Violations",
    overview:
      "Consistency protects brand trust—and misuse breaks it. This section outlines common violations and missteps to avoid, including logo misuse, improper color applications, typography inconsistencies, layout breakdowns, and co-branding errors. Follow these to ensure everything stays aligned, legible, and on-brand.",
    subsections: [
      {
       number: "7.1",
  title: "Logo Misuse",
  content: `<div class="mb-6">
    <p class="text-[#343e47] mb-4">Our logo is one of the most visible and consistent expressions of our brand. Any misuse compromises clarity, recognition, and professionalism. The logo must always retain its original proportions, color integrity, and surrounding clear space.</p>
    
    <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
      <p class="text-[#343e47] flex items-start">
        <span class="text-red-500 mr-2 mt-1">📌</span>
        <span>Refer to Section 2.1 for proper logo usage, minimum size, and clear space rules.</span>
      </p>
    </div>

    <p class="text-[#343e47] mb-4 font-medium">The following are never allowed:</p>
    
    <ul class="list-none space-y-2 ml-0 mb-6">
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-2 mt-1">■</span>
        <span>Do not alter proportions. The relationship between the mark and the word "Carenet" is fixed. Do not stretch, compress, or scale elements independently.</span>
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-2 mt-1">■</span>
        <span>Do not recolor. Only brand-approved colors may be used. Crimson is reserved for the mark only; the wordmark should remain in Slate unless reversed on dark backgrounds.</span>
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-2 mt-1">■</span>
        <span>Do not rotate, flip, or distort the logo. Orientation must always remain upright and horizontally aligned.</span>
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-2 mt-1">■</span>
        <span>No shadows or effects. Do not apply drop shadows, bevels, glows, outlines, or any decorative effects.</span>
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-2 mt-1">■</span>
        <span>Never place the logo on low-contrast backgrounds (e.g., mid-grays, busy imagery). Use overlays or choose a clear area with proper contrast.</span>
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-2 mt-1">■</span>
        <span>Do not use the mark alone unless approved. The square mark may only be used on its own in pre-approved visual applications (e.g., footers, favicons).</span>
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-2 mt-1">■</span>
        <span>Do not embed the logo in body copy. The logo is a graphic identity—it is not a word or inline text treatment.</span>
      </li>
    </ul>

    <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
      <p class="text-[#343e47] flex items-start">
        <span class="text-red-500 mr-2 mt-1">📌</span>
        <span><strong>Don't Visual References.</strong> For any questions about logo usage please contact <a href="mailto:marketing@carenethealth.com" class="text-[#DD1533] hover:underline">marketing@carenethealth.com</a></span>
      </p>
    </div>

    <div class="overflow-x-auto mb-6">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b-2 border-[#343E47]">
            <th class="text-left p-3 font-semibold text-[#343e47]">Do Not Use Part Of The Logo</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">Do Not Rotate The Logo</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">Do Not Change the Color Of The Logo</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">Do Not Distort Or Misproportion The Logo In Any Way. Maintain Its Original Aspect Ratio At All Sizes.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 font-light text-[#343e47]">
              <div class="border border-gray-200 rounded p-2 cursor-pointer hover:border-[#DD1533] transition-colors">
                <img
                  src="https://carenethealthcare.com/wp-content/uploads/2025/06/celebrationNo-Sentence-use@4x.png"
                  alt="Do not use part of logo example"
                  class="w-full h-16 object-contain lightbox-image"
                />
              </div>
            </td>
            <td class="p-3 font-light text-[#343e47]">
              <div class="border border-gray-200 rounded p-2 cursor-pointer hover:border-[#DD1533] transition-colors">
                <img
                  src="https://carenethealthcare.com/wp-content/uploads/2025/06/celebrationROTATED@4x.png"
                  alt="Do not rotate logo example"
                  class="w-full h-16 object-contain lightbox-image"
                />
              </div>
            </td>
            <td class="p-3 font-light text-[#343e47]">
              <div class="border border-gray-200 rounded p-2 cursor-pointer hover:border-[#DD1533] transition-colors">
                <img
                  src="https://carenethealthcare.com/wp-content/uploads/2025/06/celebrationWRONG-COLOR@4x.png"
                  alt="Do not change color example"
                  class="w-full h-16 object-contain lightbox-image"
                />
              </div>
            </td>
            <td class="p-3 font-light text-[#343e47]">
              <div class="border border-gray-200 rounded p-2 cursor-pointer hover:border-[#DD1533] transition-colors">
                <img
                  src="https://carenethealthcare.com/wp-content/uploads/2025/06/celebrationWRONG-PROPORTION@4x.png"
                  alt="Do not distort proportions example"
                  class="w-full h-16 object-contain lightbox-image"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>`,
      {
        number: "7.2",
  title: "Color Misuse",
  content: `<div class="mb-6">
    <p class="text-[#343e47] mb-6">Color is one of our most important tools for clarity, emotion, and accessibility. Misuse introduces visual noise, inconsistency, and accessibility risks that compromise brand credibility.</p>
    
    <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
      <p class="text-[#343e47] flex items-start">
        <span class="text-red-500 mr-2 mt-1">📌</span>
        <span>Refer to Section 2.2 for the full brand color system, including Hex, RGB, CMYK, and usage hierarchy.</span>
      </p>
    </div>

    <div class="flex items-center gap-2 mb-4">
      <div class="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
        <span class="text-white text-xs font-bold">✓</span>
      </div>
      <h4 class="font-semibold text-[#343e47]">Acceptable Use</h4>
    </div>

    <div class="overflow-x-auto mb-6">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b-2 border-[#343E47]">
            <th class="text-left p-3 font-semibold text-[#343e47]">Color</th>
            <th class="text-left p-3 font-semibold text-[#343e47]">Approved Uses</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Crimson #DD1533 / CMYK 10, 100, 78, 3</td>
            <td class="p-3 font-light text-[#343e47]">• Stat containers • Subheadlines or emphasis text • Divider page in eBooks (used sparingly and intentionally)</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Horizon #C3E3ED / CMYK 19, 0, 6, 0</td>
            <td class="p-3 font-light text-[#343e47]">• Overlay treatments on photography (only when blue tones are present or added) • Data charts and tables only</td>
          </tr>
          <tr class="border-b border-gray-200">
            <td class="p-3 font-medium text-[#343e47]">Slate #343E47 / CMYK 75, 60, 54, 65</td>
            <td class="p-3 font-light text-[#343e47]">• Body copy • Headers and labels • Stat boxes with white text</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex items-center gap-2 mb-4">
      <div class="w-5 h-5 bg-red-500 rounded flex items-center justify-center">
        <span class="text-white text-xs font-bold">🚫</span>
      </div>
      <h4 class="font-semibold text-[#343e47]">What Not to Do</h4>
    </div>

    <ul class="list-none space-y-3 ml-0 mb-6">
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-2 mt-1">■</span>
        <span><strong>Do not use Horizon as a fill, icon, or text color.</strong> It is reserved strictly for data charts and overlays on photography.</span>
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-2 mt-1">■</span>
        <span><strong>Avoid using Crimson as a background fill for large sections</strong> unless it's a designated divider or highlight. Maintain a light, open feel throughout.</span>
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-2 mt-1">■</span>
        <span><strong>Do not place Slate text on dark backgrounds.</strong> This fails contrast requirements.</span>
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-2 mt-1">■</span>
        <span><strong>Do not use Crimson text on Slate backgrounds.</strong> The contrast is insufficient for readability.</span>
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-2 mt-1">■</span>
        <span><strong>Never create new tints or variations.</strong> All colors must be used at 100% brand-approved values.</span>
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-2 mt-1">■</span>
        <span><strong>Do not mix Crimson and Horizon</strong> in the same visual element or block. Use one accent color at a time.</span>
      </li>
    </ul>

    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div class="flex items-center gap-2 mb-3">
        <div class="w-5 h-5 bg-yellow-500 rounded flex items-center justify-center">
          <span class="text-white text-xs font-bold">⚠️</span>
        </div>
        <h5 class="font-semibold text-[#343e47]">Frequent Errors</h5>
      </div>
      <ul class="list-none space-y-2 ml-0">
        <li class="text-[#343e47] flex items-start">
          <span class="text-[#DD1533] mr-2 mt-1">■</span>
          <span>Using Horizon on anything other than approved overlay treatments or data tables</span>
        </li>
        <li class="text-[#343e47] flex items-start">
          <span class="text-[#DD1533] mr-2 mt-1">■</span>
          <span>Applying Horizon overlay across skin tones, white objects, or hair in photography</span>
        </li>
        <li class="text-[#343e47] flex items-start">
          <span class="text-[#DD1533] mr-2 mt-1">■</span>
          <span>Using Slate text on dark backgrounds</span>
        </li>
        <li class="text-[#343e47] flex items-start">
          <span class="text-[#DD1533] mr-2 mt-1">■</span>
          <span>Using Crimson on Slate</span>
        </li>
        <li class="text-[#343e47] flex items-start">
          <span class="text-[#DD1533] mr-2 mt-1">■</span>
          <span>Overusing Crimson blocks without visual relief</span>
        </li>
        <li class="text-[#343e47] flex items-start">
          <span class="text-[#DD1533] mr-2 mt-1">■</span>
          <span>Creating custom gradients, tints, or blends not defined in the brand system</span>
        </li>
      </ul>
    </div>
  </div>`,
      {
        number: "7.3",
  title: "Typography Misuse",
  content: `<div class="mb-6">
    <p class="text-[#343e47] mb-6">Typography gives structure and hierarchy to our communication. Inconsistency disrupts clarity, slows the reader down, and weakens brand recognition. Every execution—no matter the format—must follow the system.</p>
    
    <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
      <p class="text-[#343e47] flex items-start">
        <span class="text-red-500 mr-2 mt-1">📌</span>
        <span>Refer to Section 2.9 for full specs on type hierarchy, font pairings, spacing, stat formatting, and display logic.</span>
      </p>
    </div>

    <div class="flex items-center gap-2 mb-4">
      <span class="text-red-500 text-lg">🚫</span>
      <h4 class="font-semibold text-[#343e47]">The following are not allowed:</h4>
    </div>

    <ul class="list-none space-y-4 ml-0 mb-6">
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-2 mt-1">■</span>
        <div>
          <span class="font-medium">Unapproved fonts.</span>
          <span class="ml-1">Only Aptos, PP Neue Montreal, and Neue Haas Grotesk Display are permitted. No system font substitutions.</span>
        </div>
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-2 mt-1">■</span>
        <div>
          <span class="font-medium">Style overrides.</span>
          <span class="ml-1">Do not bold or italicize full paragraphs or stretch weight beyond approved type treatments. Bold is for emphasis only—never for full body copy.</span>
        </div>
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-2 mt-1">■</span>
        <div>
          <span class="font-medium">All caps misuse.</span>
          <span class="ml-1">Do not apply full caps to body copy, stat labels, or headlines unless specifically approved for layout. All caps may be used sparingly in stat headers (e.g., in one-pagers).</span>
        </div>
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-2 mt-1">■</span>
        <div>
          <span class="font-medium">Incorrect type sizing or spacing.</span>
          <span class="ml-1">Body copy should remain 11 pt with 16 pt leading and 30 tracking. Do not adjust size, leading, or tracking unless directed by a designer.</span>
        </div>
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-2 mt-1">■</span>
        <div>
          <span class="font-medium">Baked-in type.</span>
          <span class="ml-1">Do not embed stats or headings into PNGs or design files. All typography must remain live and editable.</span>
        </div>
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-2 mt-1">■</span>
        <div>
          <span class="font-medium">Bullet misuse.</span>
          <span class="ml-1">Only use square bullets. Do not use circular bullets, em dashes, or unstyled symbols.</span>
        </div>
      </li>
    </ul>

    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-yellow-600 text-lg">⚠️</span>
        <h5 class="font-semibold text-[#343e47]">Frequent Errors to Avoid</h5>
      </div>
      <ul class="list-none space-y-2 ml-0">
        <li class="text-[#343e47] flex items-start">
          <span class="text-[#DD1533] mr-2 mt-1">■</span>
          <span>Using display fonts for stats (body text must use stat styling defined in Section 2.9)</span>
        </li>
        <li class="text-[#343e47] flex items-start">
          <span class="text-[#DD1533] mr-2 mt-1">■</span>
          <span>Applying all caps to headlines without approval</span>
        </li>
        <li class="text-[#343e47] flex items-start">
          <span class="text-[#DD1533] mr-2 mt-1">■</span>
          <span>Using body fonts for stats instead of Neue Haas Grotesk Display Medium</span>
        </li>
        <li class="text-[#343e47] flex items-start">
          <span class="text-[#DD1533] mr-2 mt-1">■</span>
          <span>Defaulting to circular bullets or inconsistent list formatting</span>
        </li>
        <li class="text-[#343e47] flex items-start">
          <span class="text-[#DD1533] mr-2 mt-1">■</span>
          <span>Forgetting to apply brand-approved tracking, spacing, and font pairings</span>
        </li>
      </ul>
    </div>
  </div>`,
      },
      {
       number: "7.4",
  title: "Co-Branding and Partnership Misuse",
  content: `<div class="mb-6">
    <p class="text-[#343e47] mb-6">When Carenet's brand appears alongside a partner or client, logo lockups must follow approved configurations to preserve legibility, balance, and brand equity. These are typically used in press releases, landing pages, or joint-marketing assets. Lockups should never feel cramped or imbalanced.</p>
    
    <h4 class="font-semibold text-[#343e47] mb-4">Lockup Rules:</h4>
    
    <ul class="list-none space-y-2 ml-0 mb-6">
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Always use the approved horizontal lockup when placing logos side-by-side
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Maintain clear space around both logos equal to the height of the Carenet symbol
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Ensure logo scale is visually balanced—no logo should dominate
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Align logos by optical center, not baseline
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Use a thin vertical rule (Slate, 1pt) to separate logos when needed
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Never stack logos or create diagonal or circular arrangements
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Do not apply effects, outlines, or container shapes unless approved
      </li>
    </ul>
    
    <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
      <p class="text-[#343e47] flex items-start">
        <span class="text-red-500 mr-2 mt-1">📌</span>
        <span class="italic">All co-branded logo lockups must be approved by the Creative Team. Standard lockup templates are available upon request.</span>
      </p>
    </div>
  </div>`,
      },
      {
        number: "7.5",
        title: "Photography Misuse",
        content:
          "Photography must be consistent with our tone: authentic, professional, and relevant to the healthcare experience.\n\nDo not:\n• Use imagery that feels staged, overly posed, or emotionally exaggerated\n• Allow green or yellow cast to remain without Horizon correction\n• Apply Horizon as decoration—it's a balance tool\n• Show full faces unless part of an intentional emotional composition\n• Include eye contact that breaks the moment or disrupts neutrality",
      },
      {
        number: "7.6",
  title: "Layout and Grid Violations",
  content: `<div class="mb-6">
    <p class="text-[#343e47] mb-6"><strong>Consistency in layout builds visual trust.</strong> When design elements deviate from our grid logic, spacing system, or asset-specific templates, the result is confusion, imbalance, and dilution of brand credibility.</p>
    
    <div class="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
      <p class="text-[#343e47] flex items-start">
        <span class="text-red-500 mr-2 mt-1">📌</span>
        <span>Refer to Section 4 for detailed layout structure, grid system, margin rules, and advanced applications.</span>
      </p>
    </div>

    <h4 class="font-semibold text-[#343e47] mb-4">Structural Misuse</h4>
    
    <ul class="list-none space-y-2 ml-0 mb-6">
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Placing any element outside the defined grid or margin boundaries
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Floating icons, stats, or callouts in dead space—everything must anchor to the grid
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Mixing layout rules across asset types (e.g., using eBook spacing in a whitepaper)
      </li>
    </ul>

    <h4 class="font-semibold text-[#343e47] mb-4">Rhythm & Spacing Issues</h4>
    
    <ul class="list-none space-y-2 ml-0 mb-6">
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Ignoring typographic rhythm (e.g., incorrect bullet spacing, inconsistent paragraph returns)
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Center-aligning stat blocks unless the template is designed to allow it
      </li>
    </ul>

    <div class="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
      <p class="text-[#343e47] mb-2"><strong>If you're unsure about layout decisions or working outside of a template, contact:</strong></p>
      <p class="text-[#343e47] flex items-center">
        <span class="mr-2">📧</span>
        <a href="mailto:marketing@carenethealth.com" class="text-[#DD1533] hover:underline">marketing@carenethealth.com</a>
      </p>
    </div>
  </div>`,
      },
    ],
  },
  {
    number: "08",
    title: "Implementation Tools",
    overview:
      "Execution matters. From file naming conventions and approval workflows to asset access and compliance checklists, this section ensures teams know exactly how to maintain brand fidelity across every touchpoint.",
    subsections: [
      {
        number: "8.1",
        title: "File Naming & Organization",
        content: `<div class="mb-6">
    <p class="text-[#343e47] mb-6"><strong>Consistent file naming is critical for version control, asset retrieval, and collaboration across teams.</strong> All files must follow a clear structure that identifies the asset type, version, audience, and date.</p>
    
    <ul class="list-none space-y-2 ml-0 mb-6">
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-2 mt-1">■</span>
        The following naming conventions are for production files only—used internally to manage drafts, versioning, and reviews.
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-2 mt-1">■</span>
        <div>
          Once a file is final and approved for upload or distribution, rename it using only the asset title. Prefix with the asset type, followed by the title and file extension. For example:
          <div class="bg-gray-50 rounded-lg p-3 mt-2">
            <p class="text-[#343e47] font-mono text-sm">Ebook-The Cost of Medicaid Reduction 2025.pdf</p>
          </div>
        </div>
      </li>
    </ul>
    
    <h4 class="font-semibold text-[#DD1533] mb-3 text-lg">Standard Naming Convention (Use Across All Teams)</h4>
    <div class="bg-gray-50 rounded-lg p-4 mb-6">
      <p class="text-[#343e47] font-mono text-sm">[Project/AssetType]_[Description]_[Version/Date].ext</p>
    </div>

    <h4 class="font-semibold text-[#343e47] mb-3">Examples:</h4>
    <ul class="list-none space-y-2 ml-0 mb-6">
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        <span class="font-mono text-sm">Ebook_CareManagementOverview_V2_2025-05-10.pdf</span>
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        <span class="font-mono text-sm">Whitepaper_OutcomesPlaybook_V1_2025-04-01.docx</span>
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        <span class="font-mono text-sm">Social_Launch_NewServiceAd_V3_2025-06-12.psd</span>
      </li>
    </ul>

    <h4 class="font-semibold text-[#343e47] mb-3">General Rules:</h4>
    <ul class="list-none space-y-2 ml-0 mb-6">
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Use underscores—not spaces—in filenames
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Never use final/finalfinal/finalfinal2 in filenames
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Include version numbers (V1, V2, etc.) to avoid duplication or confusion
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Use ISO date format (YYYY-MM-DD) when dating files
      </li>
    </ul>

    <div class="border-t-2 border-gray-300 pt-6 mt-8">
      <h4 class="font-semibold text-[#DD1533] mb-3 text-lg">When Files Are Business Unit–Specific</h4>
      <p class="text-[#343e47] mb-3">Prefix the filename with the approved BU label:</p>
      <div class="bg-gray-50 rounded-lg p-4 mb-6">
        <p class="text-[#343e47] font-mono text-sm">[BU]_[Project/AssetType]_[Description]_[Version/Date].ext</p>
      </div>

      <h4 class="font-semibold text-[#343e47] mb-3">Example:</h4>
      <ul class="list-none space-y-2 ml-0 mb-6">
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#DD1533] mr-2">■</span>
          <span class="font-mono text-sm">BU_CareManagement_Ebook_CareOverview_V2_2025-05-10.pdf</span>
        </li>
      </ul>

      <h4 class="font-semibold text-[#343e47] mb-3">Approved BU Labels:</h4>
      <ul class="list-none space-y-2 ml-0 mb-6">
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#DD1533] mr-2">■</span>
          BU_AccessAcquisition
        </li>
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#DD1533] mr-2">■</span>
          BU_CareManagement
        </li>
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#DD1533] mr-2">■</span>
          BU_HealthcareBPO
        </li>
        <li class="text-[#343e47] flex items-center">
          <span class="text-[#DD1533] mr-2">■</span>
          BU_Launch
        </li>
      </ul>

      <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
        <p class="text-[#343e47] italic"><strong>Note:</strong> Always prepend with "BU_" to clearly distinguish business units from internal teams or departments.</p>
      </div>
    </div>
  </div>`,
      },
      {
        number: "8.2",
        title: "Brand Approval Workflow",
        content: `<div class="mb-6">
    <p class="text-[#343e47] mb-6">No asset—internal or external—should go live without review. The following approvals are required for any use of the Carenet Health brand:</p>
    
    <h4 class="font-semibold text-[#343e47] mb-4">Approval steps:</h4>
    
    <div class="space-y-4 mb-6">
      <div class="flex items-start">
        <span class="text-[#DD1533] font-semibold mr-3">01.</span>
        <div>
          <h5 class="font-semibold text-[#343e47] mb-1">Initial Draft Review</h5>
          <p class="text-[#343e47]">The project owner submits a draft asset to the Creative Team.</p>
        </div>
      </div>
      
      <div class="flex items-start">
        <span class="text-[#DD1533] font-semibold mr-3">02.</span>
        <div>
          <h5 class="font-semibold text-[#343e47] mb-1">Brand & Design Review</h5>
          <p class="text-[#343e47]">A Creative Team member checks for consistency in logo use, color, typography, and messaging.</p>
        </div>
      </div>
      
      <div class="flex items-start">
        <span class="text-[#DD1533] font-semibold mr-3">03.</span>
        <div>
          <h5 class="font-semibold text-[#343e47] mb-1">Departmental Stakeholder Sign-off</h5>
          <p class="text-[#343e47]">If the asset is tied to a specific business unit, it must be reviewed by that BU's leadership.</p>
        </div>
      </div>
      
      <div class="flex items-start">
        <span class="text-[#DD1533] font-semibold mr-3">04.</span>
        <div>
          <h5 class="font-semibold text-[#343e47] mb-1">Final Approval</h5>
          <p class="text-[#343e47]">The final version must be signed off by Marketing Leadership.</p>
        </div>
      </div>
    </div>
    
    <p class="text-[#343e47] mb-6">Use annotated PDFs or Google Docs with comments. Do not submit raw .docx or .pptx files without tracked feedback.</p>
    
    <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
      <p class="text-[#343e47] mb-2">For questions, submit assets or request brand review:</p>
      <p class="text-[#343e47] flex items-center">
        <span class="mr-2">📧</span>
        <a href="mailto:marketing@carenethealth.com" class="text-[#DD1533] hover:underline">marketing@carenethealth.com</a>
      </p>
    </div>
  </div>`,
      },
      {
        number: "8.3",
        title: "Brand Compliance Checklist",
        content: `<div class="mb-6">
    <p class="text-[#343e47] mb-6">Before publishing, review your asset against the following quality-control checks to ensure alignment with Carenet standards.</p>
    
    <h4 class="font-semibold text-[#343e47] mb-3">Brand Voice & Tone</h4>
    <ul class="list-none space-y-2 ml-0 mb-6">
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Does the copy reflect the approved voice traits (Authoritative, Human, Tech-enabled, Personal, Approachable)?
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Are any disallowed phrases present (e.g., "at scale," "reimagined," "frictionless")?
      </li>
    </ul>

    <h4 class="font-semibold text-[#343e47] mb-3">Typography</h4>
    <ul class="list-none space-y-2 ml-0 mb-6">
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Are the correct font families used for each content type?
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Is font sizing consistent and within approved ranges?
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Is tracking set correctly (e.g., 30 for stat blocks)?
      </li>
    </ul>

    <h4 class="font-semibold text-[#343e47] mb-3">Colors</h4>
    <ul class="list-none space-y-2 ml-0 mb-6">
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Are all color values accurate (Hex, CMYK for print)?
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Is Crimson used sparingly and strategically?
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Are text and background pairings accessible and legible (e.g., no Slate on dark backgrounds)?
      </li>
    </ul>

    <h4 class="font-semibold text-[#343e47] mb-3">Layout & Grid</h4>
    <ul class="list-none space-y-2 ml-0 mb-6">
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Does the asset follow the 5x8 grid system?
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Are modular elements aligned to rows and columns with correct spacing?
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Is Column 1 used only for support content, never body copy?
      </li>
    </ul>

    <h4 class="font-semibold text-[#343e47] mb-3">Iconography</h4>
    <ul class="list-none space-y-2 ml-0 mb-6">
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Are approved icons used with correct styling (e.g., square container, stat alignment)?
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Are icon stats visually balanced and not overcrowded?
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Is icon placement consistent with template rules?
      </li>
    </ul>

    <h4 class="font-semibold text-[#343e47] mb-3">Photography & Visuals</h4>
    <ul class="list-none space-y-2 ml-0 mb-6">
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Is Horizon overlay used only on approved photo types (not on skin, hair, or white objects)?
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Are background elements intentionally placed and not decorative noise?
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Do all photos match tone and story of the piece?
      </li>
    </ul>

    <h4 class="font-semibold text-[#343e47] mb-3">File Naming & Versioning</h4>
    <ul class="list-none space-y-2 ml-0 mb-6">
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Are files named using approved naming conventions?
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Is the version number correct and clearly noted if not final?
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        <span class="italic">The following naming conventions apply to production files. Final files intended for upload or sharing should only include the asset type and title.</span>
      </li>
    </ul>
    
    <div class="bg-gray-50 rounded-lg p-3 mb-6">
      <p class="text-[#343e47] font-mono text-sm"><strong>Example:</strong> Ebook | The Cost of Medicaid Reduction 2025.pdf</p>
    </div>

    <h4 class="font-semibold text-[#343e47] mb-3">File Type</h4>
    <ul class="list-none space-y-2 ml-0 mb-6">
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Is the file in the correct format for delivery (e.g., PDF, JPG, MP4)?
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Have working files (e.g., INDD, PSD) been stored separately and not shared as final assets?
      </li>
    </ul>

    <h4 class="font-semibold text-[#343e47] mb-3">CTA (if applicable)</h4>
    <ul class="list-none space-y-2 ml-0 mb-6">
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Is the CTA concise, aligned to the offer, and clearly visible?
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Does the CTA use approved phrasing, and is it free of generic language like "click here"?
      </li>
    </ul>

    <h4 class="font-semibold text-[#343e47] mb-3">Data Visualization</h4>
    <ul class="list-none space-y-2 ml-0 mb-6">
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Are charts or stats formatted clearly and with consistent color logic?
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Are statistical sources cited if needed?
      </li>
      <li class="text-[#343e47] flex items-start">
        <span class="text-[#DD1533] mr-3 mt-1">☐</span>
        Do visualizations align to the modular system and grid?
      </li>
    </ul>
  </div>`,
      },
      {
        number: "8.4",
        title: "Access to Brand Assets",
        content: `<div class="mb-6">
    <p class="text-[#343e47] mb-6">Carenet's official brand files, templates, and creative resources are hosted in a centralized location. All team members must use these files—no recreations or off-template usage is allowed.</p>
    
    <div class="flex items-center gap-2 mb-4">
      <span class="text-[#343e47] text-lg">📁</span>
      <h4 class="font-semibold text-[#343e47]">Download from:</h4>
    </div>
    
    <div class="bg-gray-50 rounded-lg p-4 mb-6">
      <p class="text-[#343e47] text-sm"><a href="https://carenethealth.sharepoint.com/sites/MarketingSE" class="text-[#DD1533] hover:underline font-mono">Marketing & Sales Enablement Sharepoint</a></p>
    </div>
    
    <h4 class="font-semibold text-[#343e47] mb-3">Assets include:</h4>
    
    <ul class="list-none space-y-2 ml-0 mb-6">
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Logos and lockups (all variations)
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Approved photography library
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Iconography (SVG, PNG, AI)
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        PowerPoint and Word templates
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Campaign starter kits
      </li>
      <li class="text-[#343e47] flex items-center">
        <span class="text-[#DD1533] mr-2">■</span>
        Approved examples of headlines, stats, and layout references
      </li>
    </ul>
  </div>`,
      },
    ],
  },
  { number: "09.",
  title: "Quick Reference Appendix",
  overview: "The Appendix consolidates key references, visual reminders, and structural standards into one streamlined resource. Use it as a final checkpoint before production to ensure your work aligns with Carenet's design system and messaging framework.",
  subsections: [
    {
      number: "A.1",
      title: "Typography Quick Reference",
      content: `<div class="mb-6">
        <div class="overflow-x-auto mb-6">
          <table class="w-full border-collapse">
            <thead>
              <tr class="border-b-2 border-[#343E47]">
                <th class="text-left p-3 font-semibold text-[#343e47]">Use Case</th>
                <th class="text-left p-3 font-semibold text-[#343e47]">Font Family</th>
                <th class="text-left p-3 font-semibold text-[#343e47]">Weight</th>
                <th class="text-left p-3 font-semibold text-[#343e47]">Size</th>
                <th class="text-left p-3 font-semibold text-[#343e47]">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-200">
                <td class="p-3 font-medium text-[#343e47]">Headlines (Primary)</td>
                <td class="p-3 font-light text-[#343e47]">Neue Haas Grotesk Display</td>
                <td class="p-3 font-light text-[#343e47]">Medium</td>
                <td class="p-3 font-light text-[#343e47]">24–36 pt</td>
                <td class="p-3 font-light text-[#343e47]">Used for high-impact messaging</td>
              </tr>
              <tr class="border-b border-gray-200">
                <td class="p-3 font-medium text-[#343e47]">Subheads</td>
                <td class="p-3 font-light text-[#343e47]">Neue Haas Grotesk Display</td>
                <td class="p-3 font-light text-[#343e47]">Roman / Medium</td>
                <td class="p-3 font-light text-[#343e47]">12–16 pt</td>
                <td class="p-3 font-light text-[#343e47]">Weight depends on emphasis level</td>
              </tr>
              <tr class="border-b border-gray-200">
                <td class="p-3 font-medium text-[#343e47]">Body Copy</td>
                <td class="p-3 font-light text-[#343e47]">PP Neue Montreal</td>
                <td class="p-3 font-light text-[#343e47]">Book</td>
                <td class="p-3 font-light text-[#343e47]">9–10 pt</td>
                <td class="p-3 font-light text-[#343e47]">Core narrative content; rag right, flush left</td>
              </tr>
              <tr class="border-b border-gray-200">
                <td class="p-3 font-medium text-[#343e47]">Labels / Callouts</td>
                <td class="p-3 font-light text-[#343e47]">PP Neue Montreal</td>
                <td class="p-3 font-light text-[#343e47]">Medium</td>
                <td class="p-3 font-light text-[#343e47]">8–9 pt</td>
                <td class="p-3 font-light text-[#343e47]">Used for taglines, short labels, and stat descriptions</td>
              </tr>
              <tr class="border-b border-gray-200">
                <td class="p-3 font-medium text-[#343e47]">Statistical Emphasis</td>
                <td class="p-3 font-light text-[#343e47]">Neue Haas Grotesk Display</td>
                <td class="p-3 font-light text-[#343e47]">Medium</td>
                <td class="p-3 font-light text-[#343e47]">15 pt</td>
                <td class="p-3 font-light text-[#343e47]">Used only when stat is present in 1-column callouts</td>
              </tr>
              <tr class="border-b border-gray-200">
                <td class="p-3 font-medium text-[#343e47]">Legal / Footnotes</td>
                <td class="p-3 font-light text-[#343e47]">PP Neue Montreal</td>
                <td class="p-3 font-light text-[#343e47]">Book</td>
                <td class="p-3 font-light text-[#343e47]">7 pt</td>
                <td class="p-3 font-light text-[#343e47]">Smallest acceptable size for accessibility</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>`
    },
    {
      number: "A.2",
      title: "Color Usage Guide",
      content: `<div class="mb-6">
        <div class="overflow-x-auto mb-6">
          <table class="w-full border-collapse">
            <thead>
              <tr class="border-b-2 border-[#343E47]">
                <th class="text-left p-3 font-semibold text-[#343e47]">Name</th>
                <th class="text-left p-3 font-semibold text-[#343e47]">Hex</th>
                <th class="text-left p-3 font-semibold text-[#343e47]">CMYK (Print)</th>
                <th class="text-left p-3 font-semibold text-[#343e47]">Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-200">
                <td class="p-3 font-medium text-[#343e47]">Crimson</td>
                <td class="p-3 font-light text-[#343e47]">#DD1533</td>
                <td class="p-3 font-light text-[#343e47]">10, 100, 78, 3</td>
                <td class="p-3 font-light text-[#343e47]">Accent color, stat backgrounds, labels, callouts</td>
              </tr>
              <tr class="border-b border-gray-200">
                <td class="p-3 font-medium text-[#343e47]">Slate</td>
                <td class="p-3 font-light text-[#343e47]">#343E47</td>
                <td class="p-3 font-light text-[#343e47]">75, 61, 53, 43</td>
                <td class="p-3 font-light text-[#343e47]">Primary text color; do not use on dark backgrounds</td>
              </tr>
              <tr class="border-b border-gray-200">
                <td class="p-3 font-medium text-[#343e47]">White</td>
                <td class="p-3 font-light text-[#343e47]">#FFFFFF</td>
                <td class="p-3 font-light text-[#343e47]">0, 0, 0, 0</td>
                <td class="p-3 font-light text-[#343e47]">Backgrounds and icons over Crimson</td>
              </tr>
              <tr class="border-b border-gray-200">
                <td class="p-3 font-medium text-[#343e47]">Light Gray</td>
                <td class="p-3 font-light text-[#343e47]">#F9F9F9</td>
                <td class="p-3 font-light text-[#343e47]">4, 3, 4, 0</td>
                <td class="p-3 font-light text-[#343e47]">Background fill or divider elements</td>
              </tr>
              <tr class="border-b border-gray-200">
                <td class="p-3 font-medium text-[#343e47]">Horizon Blue</td>
                <td class="p-3 font-light text-[#343e47]">#92D8F8</td>
                <td class="p-3 font-light text-[#343e47]">41, 0, 1, 0</td>
                <td class="p-3 font-light text-[#343e47]">For overlays in data tables, charts, or select photos only</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <p class="text-[#343e47] flex items-start">
            <span class="text-yellow-600 mr-2 mt-1">⚠️</span>
            <span><strong>Do not use Horizon Blue for background fills, watermark elements, or behind skin tones in photography. Use sparingly and with approval.</strong></span>
          </p>
        </div>
      </div>`
    },
    {
      number: "A.3",
      title: "Layout Grid Snapshot",
      content: `<div class="mb-6">
        <h4 class="font-semibold text-[#343e47] mb-4">Base Grid System:</h4>
        <ul class="list-none space-y-2 ml-0 mb-6">
          <li class="text-[#343e47] flex items-center">
            <span class="text-[#DD1533] mr-2">■</span>
            <strong>Columns:</strong> 5
          </li>
          <li class="text-[#343e47] flex items-center">
            <span class="text-[#DD1533] mr-2">■</span>
            <strong>Rows:</strong> 8
          </li>
          <li class="text-[#343e47] flex items-center">
            <span class="text-[#DD1533] mr-2">■</span>
            <strong>Gutter:</strong> 0.1667 in (horizontal & vertical)
          </li>
          <li class="text-[#343e47] flex items-center">
            <span class="text-[#DD1533] mr-2">■</span>
            <strong>Margin:</strong> 0.375 in (all sides)
          </li>
        </ul>

        <h4 class="font-semibold text-[#343e47] mb-4">Key Rules:</h4>
        <ul class="list-none space-y-2 ml-0 mb-6">
          <li class="text-[#343e47] flex items-center">
            <span class="text-[#DD1533] mr-2">■</span>
            All assets follow this grid unless noted
          </li>
          <li class="text-[#343e47] flex items-center">
            <span class="text-[#DD1533] mr-2">■</span>
            Column 1 is for stats, icons, or callouts — never body copy
          </li>
          <li class="text-[#343e47] flex items-center">
            <span class="text-[#DD1533] mr-2">■</span>
            Body copy starts in Column 2 or 3 depending on layout
          </li>
          <li class="text-[#343e47] flex items-center">
            <span class="text-[#DD1533] mr-2">■</span>
            No design elements should override the margin or grid without approval
          </li>
        </ul>
      </div>`
    },
    {
      number: "A.4",
      title: "Visual Style Reminders",
      content: `<div class="mb-6">
        <div class="overflow-x-auto mb-6">
          <table class="w-full border-collapse">
            <thead>
              <tr class="border-b-2 border-[#343E47]">
                <th class="text-left p-3 font-semibold text-[#343e47]"><span class="text-green-600">✓</span> Do</th>
                <th class="text-left p-3 font-semibold text-[#343e47]"><span class="text-red-600">🚫</span> Don't</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-200">
                <td class="p-3 font-light text-[#343e47]">Use square bullets (not circles)</td>
                <td class="p-3 font-light text-[#343e47]">Don't use circular bullets</td>
              </tr>
              <tr class="border-b border-gray-200">
                <td class="p-3 font-light text-[#343e47]">Maintain Crimson tracking at 30</td>
                <td class="p-3 font-light text-[#343e47]">Don't stretch or distort typography or icons</td>
              </tr>
              <tr class="border-b border-gray-200">
                <td class="p-3 font-light text-[#343e47]">Use baseline alignment across icons, stats, and copy</td>
                <td class="p-3 font-light text-[#343e47]">Don't combine red icon boxes and standalone Slate icons</td>
              </tr>
              <tr class="border-b border-gray-200">
                <td class="p-3 font-light text-[#343e47]">Pair icons with text either below or beside</td>
                <td class="p-3 font-light text-[#343e47]">Never place icon text below and beside simultaneously</td>
              </tr>
              <tr class="border-b border-gray-200">
                <td class="p-3 font-light text-[#343e47]">Use Horizon overlays only on photos without skin tones</td>
                <td class="p-3 font-light text-[#343e47]">Don't apply Horizon overlays on people, white clothing, or hair</td>
              </tr>
              <tr class="border-b border-gray-200">
                <td class="p-3 font-light text-[#343e47]">Use Crimson sparingly as background fill</td>
                <td class="p-3 font-light text-[#343e47]">Don't place Slate text on dark or Slate-colored backgrounds</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>`
    },
    {
      number: "A.5",
      title: "File Naming and Version Control",
      content: `<div class="mb-6">
        <h4 class="font-semibold text-[#343e47] mb-4">File Naming Convention</h4>
        <p class="text-[#343e47] mb-6">Maintain consistency in all production files.</p>
        
        <div class="space-y-4 mb-6">
          <div class="bg-blue-50 border-l-4 border-blue-400 p-4">
            <h5 class="font-semibold text-[#343e47] mb-2">Production Files:</h5>
            <p class="text-[#343e47] mb-2">Use descriptive, hyphenated naming:</p>
            <p class="text-[#343e47] font-mono text-sm bg-white p-2 rounded border">ebook-cost-of-medicaid-reduction-2025-v2.indd</p>
          </div>
          
          <div class="bg-green-50 border-l-4 border-green-400 p-4">
            <h5 class="font-semibold text-[#343e47] mb-2">Final Output Files (Shared or Uploaded):</h5>
            <p class="text-[#343e47] mb-2">Label using plain title and format, capitalized with no internal hyphens:</p>
            <p class="text-[#343e47] font-mono text-sm bg-white p-2 rounded border">Ebook | The Cost of Medicaid Reduction 2025.pdf</p>
          </div>
        </div>
        
        <div class="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
          <p class="text-[#343e47] flex items-start">
            <span class="text-green-600 mr-2 mt-1">✔️</span>
            <span><strong>Only the final PDF or shared file should use this format. Do not upload working file names.</strong></span>
          </p>
        </div>
      </div>`
    }
  ]
}
]

export default function BrandGuidelinesChat() {
  const [currentView, setCurrentView] = useState<"home" | "section" | "subsection" | "chat">("home")
  const [selectedSection, setSelectedSection] = useState<Section | null>(null)
  const [selectedSubsection, setSelectedSubsection] = useState<Subsection | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [showSectionContent, setShowSectionContent] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

useEffect(() => {
  const handleImageClick = (e) => {
    if (e.target.classList.contains('lightbox-image')) {
      setLightboxImage(e.target.src);
    }
  };

  document.addEventListener('click', handleImageClick);
  return () => document.removeEventListener('click', handleImageClick);
}, [])

  const handleSectionClick = (section: Section) => {
    setSelectedSection(section)
    setSelectedSubsection(null)
    setCurrentView("section")
    setShowSectionContent(false)
  }

  const handleSubsectionClick = (subsection: Subsection) => {
    setSelectedSubsection(subsection)
    setCurrentView("subsection")
    setShowSectionContent(true)
  }

  const generateCareyResponse = (
    query: string,
  ): { content: string; detailedContent?: string; hasVisualReference?: boolean; visualReferenceUrl?: string } => {
    const lowerQuery = query.toLowerCase()

    // Create a comprehensive keyword mapping to content
    const findRelevantContent = (query: string) => {
      // Logo-related keywords
      if (
        query.includes("logo do") ||
        query.includes("logo don") ||
        query.includes("logo misuse") ||
        query.includes("logo restrictions") ||
        query.includes("unauthorized") ||
        query.includes("logo rules") ||
        query.includes("logo guidelines")
      ) {
        return {
          section: "Logo Guidelines & Restrictions",
          content: "Here are the complete logo guidelines including what you can and cannot do:",
          detailedContent: `2.6 Unauthorized Modifications

The Carenet Health logo may not be:
• Resized disproportionately or rotated
• Colored outside of the approved palette
• Shadowed, outlined, or given any visual effect
• Crowded with elements within the clear space
• Reconstructed, split, or rearranged

7.1 Logo Misuse

Our logo is one of the most visible and consistent expressions of our brand. Any misuse compromises clarity, recognition, and professionalism.

The following are never allowed:
• Do not alter proportions
• Do not recolor outside approved palette
• Do not rotate, flip, or distort the logo
• No shadows or effects
• Never place on low-contrast backgrounds
• Do not use the mark alone unless approved
• Do not embed the logo in body copy

2.2 Logo Variations

• Primary: Slate/Crimson (EPS | PNG)
• Secondary: Black/Red, White/Red, One-Color Black, One-Color White (EPS | PNG)

📌 Use the primary logo for all default applications unless visual contrast requires a secondary version.

• Use white logos on dark backgrounds only.
• Use one-color black or white versions in grayscale, B&W print, or PowerPoint with flat color backgrounds.

2.4 Minimum Logo Size

• Digital: 44.96px wide
• Print: Maintain legibility; anything smaller requires Marketing approval (marketing@carenethealth.com)

2.5 Backgrounds & Legibility

• Logo must appear on high-contrast backgrounds only
• Use extra clear space in crowded or layered designs
• Acceptable on solid, textured, or photographic backgrounds only if legibility is maintained`,
        }
      }

      // File naming keywords
      if (
        query.includes("file nam") ||
        query.includes("name scheme") ||
        query.includes("naming convention") ||
        query.includes("file organization") ||
        query.includes("file structure")
      ) {
        return {
          section: "File Naming & Organization",
          content: "Here's our complete file naming system and organization structure:",
          detailedContent: `8.1 File Naming & Organization

Consistent file naming is critical for version control, asset retrieval, and collaboration across teams.

Use the following structure:
[Project/AssetType]_[BU/Team]_[Description]_[Version/Date].ext

General rules:
• Always use underscores—not spaces—in filenames
• Never use final/finalfinal/finalfinal2 in filenames
• Include version numbers (V1, V2, etc.)
• Use ISO date format (YYYY-MM-DD) when dating files

Examples:
• Ebook_CM_CareManagementOverview_V2_2025-05-10.pdf
• Whitepaper_BPO_OutcomesPlaybook_V1_2025-04-01.docx
• Social_Launch_NewServiceAd_V3_2025-06-12.psd`,
        }
      }

      // Photography keywords
      if (
        query.includes("photo") ||
        query.includes("image") ||
        query.includes("photography") ||
        query.includes("style") ||
        query.includes("tone") ||
        query.includes("visual")
      ) {
        return {
          section: "Photography & Imagery Guidelines",
          content: "Here's our complete photography and imagery style guide:",
          detailedContent: `3.1 Overall Style & Tone

Carenet Health's photography should reflect the intersection of:

• Healthcare professionalism
• Bedside manner and patient engagement
• Business operations and executive decision-making
• Human-centered technology (real—not conceptual or overly digitized)

The tone must remain grounded, relatable, and credible. Photos should feel authentic—not staged, stocky, or emotionally exaggerated.

Avoid common stock clichés:
• Artificial light flares, sci-fi overlays, or overtly stylized light leaks
• Overlay graphics imposed on real people
• Over-filtered portraits or staged emotions
• Conceptual images that use symbolism in place of real context

3.2 Color Balance

Carenet's visual identity relies on a careful balance of color to maintain consistency, clarity, and emotional tone across all brand imagery. Because Crimson is such a bold accent in our palette, we intentionally use blue as the dominant visual anchor in photography to create a grounded, calming contrast.

When natural blue tones are missing, apply a Horizon overlay (Pantone 7457U | #C3E3ED) to reinforce the brand's blue-to-neutral tonal range.

• Horizon is used only on photography to bring balance and visual cohesion
• Do not apply Horizon over skin tones directly
• Blend modes like Multiply or Soft Light at ~20-40% opacity are recommended
• Horizon is a balancing tool, not a decorative filter

3.3 Subject Framing & Focus

Carenet's photography prioritizes activity over posed expressions. We don't lead with smiles—we focus on the work, the moment, or the gesture. The goal is to capture real, in-progress interactions that reflect the business of healthcare.

Framing rules:

Primary focus should be below the eyes (mouth, hands, body language)

Show context over emotion: patients speaking with nurses, advisors using tools, executives in conversation

Crop with intent; allow whitespace for graphic layering when needed

Group photography considerations:
Group shots are acceptable, but they present unique challenges when following our focus-on-action guidance. It may be difficult to eliminate faces entirely or highlight only below-the-eyes framing. In these cases:

Choose photos where most (if not all) subjects are facing to the side, not straight into the camera

Side profiles are permitted when they help reduce emotional staging and maintain neutrality

If two people are in frame, one person may show a side-facing expression, but the other's face should be cropped to de-emphasize facial focus

Always prioritize gesture and interaction over expression

Avoid:
• Full-face portraits unless purposefully editorial
• Direct eye contact unless used with intent
• Cropping too tightly—leave breathing room

📌 If unsure how to frame, refer to the visual samples in the brand asset library or consult the Creative Team.`,
        }
      }

      // Color keywords
      if (
        query.includes("color") ||
        query.includes("palette") ||
        query.includes("crimson") ||
        query.includes("slate") ||
        query.includes("horizon") ||
        query.includes("air")
      ) {
        return {
          section: "Color System",
          content: "Here's our complete color system and usage guidelines:",
          detailedContent: `2.7 Color System

Primary Palette:

• Crimson: #DD1533 | RGB: 221,21,51 | CMYK: 7,100,86,1 | Pantone: 199C
• Slate: #343e47 | RGB: 52,62,71 | CMYK: 77,64,53,44 | Pantone: 432C
• Air: #F9F9F9 | RGB: 249,249,249 | CMYK: 2,1,1,0 | Pantone: P 179-1C

Special Use Palette:
• Horizon: #C3E3ED | RGB: 195,227,237 | CMYK: 22,2,5,0 | Pantone: 7457U

📌 Horizon is only used for overlays on photography and data charts. It is not permitted for icons, backgrounds, or typography.

2.8 Crimson & Slate Tint Guidelines

Crimson (Pantone 199 C | #DD1533) & Slate (Pantone 432 C | #343E47) may be used in tints for backgrounds, visual layering, and select data visualization elements.

For Crimson:
• 100% Crimson: Default accent color for callouts, highlights, and icon emphasis
• 70% Crimson: For approved data visualizations (not for text)
• 50% Crimson: For approved data visualizations (not for text)
• 20% Crimson: For approved data visualizations (not for text)

For Slate:
• Slate tints must be applied as fills, not opacity masks
• Never use Slate tints below 20%—reduced visibility compromises accessibility
• Only approved tint values: 100%, 70%, 50%, 20%

7.2 Color Misuse

Color is one of our most important tools for clarity, emotion, and accessibility. Using color improperly creates visual noise and breaks visual trust.

What not to do:
• Never use Horizon for fills, icons, or typography
• Do not overuse Crimson
• Avoid unapproved tints or gradients
• No multi-accent compositions
• Do not place Slate on Slate`,
          hasVisualReference: true,
          visualReferenceUrl: "/images/color-reference.png",
        }
      }

      // Typography keywords
      if (
        query.includes("font") ||
        query.includes("typography") ||
        query.includes("typeface") ||
        query.includes("headline") ||
        query.includes("emphasis") ||
        query.includes("subhead")
      ) {
        return {
          section: "Typography System",
          content: "Here's our complete typography system and headline emphasis rules:",
          detailedContent: `2.9 Typography Settings

Body Copy (design): PP Neue Montreal Book, 11 pt, 30 tracking, 16 pt leading
Headlines: Neue Haas Grotesk Display Medium, Variable size, Auto tracking, Based on layout leading
Subheads (optional): Neue Haas Grotesk Display Roman, Variable size, Auto tracking, Based on layout leading
Lists (emphasis): PP Neue Montreal SemiBold, Match body size, Match tracking, 20 pt leading

2.10 Headline Emphasis Rule

Headlines are a core component of Carenet's visual voice and must be styled with intentional clarity and emphasis.

Color Usage:
• Only up to three words in a headline may be styled using Crimson (#DD1533)
• Remaining words should be in Slate (PMS 432C) or a 20% tint of Slate
• Use Crimson strategically to highlight keywords, not filler
• If the headline appears on a dark background, default all text to white

Weight Usage:
• Emphasized words (Crimson) should be set in Neue Haas Grotesk Display – Medium
• Non-emphasized words (Slate) should be set in Neue Haas Grotesk Display – Roman
• Never bold an entire headline

Do Not:
• Apply color to more than three words
• Mix multiple colors within the same word
• Apply emphasis randomly—tie it to value-driven terms
• Use Slate tints below 20%—lower opacity reduces legibility

2.11 System Font Family for Non-Designers

In environments where brand fonts are not available (e.g., MS Office), use Aptos:

Headline: Aptos Regular
Emphasis Phrase: Aptos Bold
Body Copy: Aptos Light

Use Aptos in:
• Microsoft Word
• PowerPoint
• Outlook

Avoid using Arial, Calibri, or Times New Roman.

7.3 Typography Misuse

Typography is a key element of our brand identity. Using it incorrectly can undermine our message and create a negative impression.

What not to do:
• Do not use unapproved fonts
• Do not distort or stretch the type
• Do not use excessive kerning or tracking
• Do not use too many different font sizes`,
          hasVisualReference: true,
          visualReferenceUrl: "/placeholder.svg?height=150&width=500&text=Headline+Emphasis+Example",
        }
      }

      // Voice and messaging keywords
      if (
        query.includes("voice") ||
        query.includes("tone") ||
        query.includes("messaging") ||
        query.includes("writing") ||
        query.includes("copy")
      ) {
        return {
          section: "Brand Voice & Messaging",
          content: "Here's our complete brand voice and messaging guidelines:",
          detailedContent: `5.1 Voice Traits

• Authoritative — grounded in expertise without arrogance
• Human — emotionally aware, sincere, never robotic
• Tech-enabled — forward-looking but not buzzwordy
• Personal — relational, not promotional
• Approachable — smart and inviting, not overly casual

📌 When ghostwriting or editing for executives or SMEs, their tone should be respected—but it must still align with Carenet's brand voice.

5.2 Channel-Specific Tone Guidance

Website: Authoritative, educational, solution-oriented
Whitepapers: Strategic, professional, thought leadership–driven tone with slightly elevated language
eBooks: Conversational, helpful, informative
One-Pagers: Direct, high-impact, informative
Case Studies: Balanced: expert but human, performance-driven without being salesy
Social Media: Non-salesy, Personable, creative, warm — room for playfulness as long as it aligns with tone
Digital Ads: Clear, non-salesy, personalized to pain points, never clickbait-y

5.3 Messaging Principles

• Lead with value, not vanity → Highlight outcomes and insights—not ourselves
• Speak to people, not personas → Write like you're solving a real problem for a real person
• Use plain language with depth → Keep it simple but never generic or dumbed down
• Stay channel-conscious → The format matters
• Respect the reader's time → Get to the point

Avoid terms like: Unlock, Empower, Discover, Revolutionize, Game-changing, Cutting-edge

5.4 Key Messaging Framework

Positioning Line: Powering the business of healthcare.
Proof Point: Organizations using our platform reduced manual steps by 28% in 90 days.
Value Proposition: We simplify workflows, improve ROI, and protect margins.
Challenge Framing: Payers and providers are expected to do more—with less.
Call to Action: See how we deliver outcomes—not just impressions.

5.5 Writing Style Guidelines

• Sentence Length: Mix short and medium-length for rhythm
• Tone: Professional with warmth, never corporate fluff
• Pronouns: Use 'you,' 'we,' and 'your team' instead of abstract terms
• Punctuation: Use periods. Avoid overuse of exclamations or em dashes
• Formatting: Use subheads, bullets, and whitespace to guide the reader
• Casing: Use sentence case for all titles, headlines, and subheads unless explicitly approved otherwise`,
        }
      }

      // Clear space keywords
      if (
        query.includes("clear space") ||
        query.includes("logo space") ||
        query.includes("spacing") ||
        query.includes("clearance")
      ) {
        return {
          section: "Logo Clear Space",
          content: "Here are the complete clear space rules for our logo:",
          detailedContent: `2.3 Clear Space Rule

To maintain the logo's visual impact, a clear space equal to the x-height of the lowercase 'a' in 'Carenet' must be maintained on all sides—top, bottom, left, and right. This exclusion zone ensures no other graphic elements, text, or images interfere with logo integrity.

Definitions:
• Baseline: The invisible line where the letterforms rest
• x-Height: The height of the lowercase 'a' from baseline to top

📌 This applies in all media—digital, print, and environmental.`,
          hasVisualReference: true,
          visualReferenceUrl: "/placeholder.svg?height=400&width=600&text=Carenet+Logo+Clear+Space+Guidelines",
        }
      }

      // Grid and layout keywords
      if (
        query.includes("grid") ||
        query.includes("layout") ||
        query.includes("margin") ||
        query.includes("column") ||
        query.includes("structure")
      ) {
        return {
          section: "Grid System & Layout",
          content: "Here's our complete grid system and layout guidelines:",
          detailedContent: `4.2 Base Grid Structure

• Columns: 5
• Rows: 8
• Gutters: 0.1667" vertical and horizontal
• Fitted To: Margins (not full-bleed)

This 5x8 modular system forms the foundation for layout across eBooks, whitepapers, one-pagers, and case studies. All templates follow this core structure and are adapted to the content type's visual and narrative needs.

4.3 Asset-Specific Layout Behavior

The 5-column grid is divided to serve distinct layout purposes:

• Columns 1 and 2 (left-most columns) are reserved for visual support content—stats, callouts, iconography, labels, or other standout elements
• Columns 3–5 (right side) house the primary body copy, aligned flush left within these columns

📌 Never place narrative content into Column 1 and half of 2 unless the layout type dictates otherwise.

4.4 Margin Discipline

Standard Margins (All Formats):
• Top: 0.375 in
• Bottom: 0.375 in
• Left: 0.375 in
• Right: 0.375 in
• Gutter: 0.1667 in

Rules:
• All copy/text must remain inside the margin boundaries
• No headlines, paragraphs, or text blocks may break or touch the margin
• Graphic elements (photos, overlays, background Carenet marks) may extend beyond margins when used intentionally, but they must never interfere with legibility or overlap with core copy content
• Margins define the safe zone for all communicative content

📌 See Section 2.13 for brand mark placement rules, which must also respect margin boundaries.

4.5 System-Wide Rules

01. Never override the grid. No object, text box, or image should ignore gutters, columns, or rows. Any exception must be pre-approved by Creative.

02. Maintain baseline alignment. Text should sit on a consistent vertical rhythm grid, even across image overlays.

03. Respect whitespace. Crowding is never acceptable. Use the grid to create natural spacing—not filler.

04. Use full-column spans intentionally. For emphasis or hierarchy—not because it 'looks better.'

05. Column 1 Rule: Always reserve Column 1 for icons, stats, and labels. Do not place body copy here.

06. Margin Rule: No copy should appear outside margin boundaries. Graphics may extend only when intentional and non-disruptive.`,
        }
      }

      // Icon keywords
      if (
        query.includes("icon") ||
        query.includes("iconography") ||
        query.includes("symbol") ||
        query.includes("graphic")
      ) {
        return {
          section: "Iconography System",
          content: "Here's our complete iconography system and usage guidelines:",
          detailedContent: `6.1 Icon Style Overview

Carenet's icon system is designed to be clean, clear, and consistent—supporting communication, not distracting from it. All icons are built using a stroke-based style that reinforces our minimal, professional aesthetic.

• Icons must be created or scaled within a 491 × 491 px artboard
• Stroke width within that space must be 13pt
• Primary stroke color = Slate
• Accent detail = Crimson (limited to one part only)
• Never use more than one Crimson accent per icon

6.2 Where Icons Are Used

Carenet's icon system is applied across virtually all touchpoints:
• Infographics and stat callouts
• One-pagers and whitepapers
• Case studies and eBooks
• Internal and external slide decks
• Social media content
• Web, digital ads, and print collateral
• Executive presentations
• Data visualization overlays
• Programmatic campaign visuals

6.3 Color Application Rules

Primary Use:
• Primary Stroke Color = Slate
• Accent Detail = Crimson (limited to one part only)
• Reverse Treatment = On dark or Crimson backgrounds, both stat and icon should be white
• Arrow Icons: May be fully Crimson, Slate, or White depending on background contrast

Do Not:
• Never use Horizon as a stroke or fill color for icons
• Never use more than one Crimson accent per icon
• Never use Slate on Slate or low-contrast combinations

6.7 Icon Usage Restrictions

The following behaviors are strictly prohibited:
• Recoloring icons outside the Slate/Crimson/White system
• Applying shadows, gradients, or 3D effects
• Stretching or distorting icon dimensions
• Embedding text or custom fonts inside icon artwork
• Using clipart, stock icons, or inconsistent third-party assets
• Breaking stroke weight or radius consistency
• Mixing icon styles (e.g., flat + stroke)`,
        }
      }

      return null
    }

    // Try to find relevant content
    const relevantContent = findRelevantContent(lowerQuery)

    if (relevantContent) {
      return {
        content: relevantContent.content,
        detailedContent: relevantContent.detailedContent,
        hasVisualReference: relevantContent.hasVisualReference,
        visualReferenceUrl: relevantContent.visualReferenceUrl,
      }
    }

    // If no specific match, ask clarifying questions
    return {
      content:
        "I'd love to help you find the right information from our brand guidelines! Could you be more specific? For example, are you looking for information about:",
      detailedContent: `• Logo guidelines (clear space, sizing, restrictions, variations)
• Color system (Crimson, Slate, Air, Horizon usage)
• Typography (fonts, headline emphasis, sizing)
• Photography style (tone, framing, color balance)
• Voice & messaging (tone, writing style, channel guidance)
• Grid system (layout, margins, columns)
• Iconography (style, colors, usage rules)
• File naming & organization
• Brand standards & restrictions

Just let me know which topic interests you, or ask about something specific like "logo clear space" or "headline emphasis rules" and I'll provide the complete guidelines!`,
    }
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = input
    setInput("")
    setIsLoading(true)

    // Smooth transition to chat view if not already there
    if (currentView !== "chat") {
      setCurrentView("chat")
    }

    // Simulate thinking delay for more natural conversation
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const response = generateCareyResponse(currentInput)

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "assistant",
      content: response.content,
      hasDetailedContent: !!response.detailedContent,
      detailedContent: response.detailedContent,
      hasVisualReference: response.hasVisualReference,
      visualReferenceUrl: response.visualReferenceUrl,
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsLoading(false)

    // Add follow-up message after a delay
    setTimeout(() => {
      const followUpMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: "assistant",
        content: "Is there anything else about our brand guidelines you'd like to know?",
      }
      setMessages((prev) => [...prev, followUpMessage])
    }, 800)
  }

  const renderHomeView = () => (
  <div className="h-full flex items-center justify-center">
    <div className="text-center">
      <p className="text-xs font-medium text-gray-400 tracking-[0.2em] uppercase mb-4">BRAND GUIDELINES</p>
      <h1 className="text-5xl font-light text-[#343e47] mb-4">Hello, I'm Carey</h1>
      <p className="text-xl text-gray-500 mb-2">Your brand guidelines assistant</p>
      <p className="text-xl text-gray-500">How can I help?</p>
    </div>
  </div>
)

 const renderSectionView = () => {
  if (!selectedSection) return null

  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#DD1533] text-white rounded-lg p-8 mb-8 flex-shrink-0">
        <h1 className="text-4xl font-light mb-4">{selectedSection.number}.</h1>
        <h2 className="text-4xl font-light mb-6">{selectedSection.title}</h2>
        {selectedSection.overview && (
          <div className="border-t border-white/20 pt-6">
            <p className="text-lg font-medium mb-2">Overview:</p>
            <p className="text-base leading-relaxed">{selectedSection.overview}</p>
          </div>
        )}
      </div>

      {selectedSection.subsections && (
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {selectedSection.subsections.map((subsection) => (
              <button
                key={subsection.number}
                onClick={() => handleSubsectionClick(subsection)}
                className="block w-full text-left p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <span className="text-[#DD1533] font-medium">{subsection.number}</span>
                <span className="text-[#343e47] ml-2">{subsection.title}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}

  const renderSubsectionView = () => {
  if (!selectedSection || !selectedSubsection) return null

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8 flex-shrink-0">
        <h1 className="text-3xl font-light text-[#343e47] mb-2">
          <span className="text-[#DD1533]">{selectedSection.number}.</span> {selectedSection.title}
        </h1>
        <div className="border-b border-gray-200 mb-6"></div>
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <span className="text-[#DD1533] font-medium">{selectedSubsection.number}</span>
          <span className="text-[#343e47] ml-2">{selectedSubsection.title}</span>
        </div>
      </div>

      <ScrollArea className="flex-1 pr-4">
        <div className="prose prose-gray max-w-none">
          <div 
            className="text-[#343e47] leading-relaxed mb-8"
            dangerouslySetInnerHTML={{ __html: selectedSubsection.content }}
          />
          {selectedSubsection.visualReference && (
            <div className="mb-8">
              <p className="text-sm font-medium text-[#343e47] mb-4">Visual Reference:</p>
              <div
                className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-[#DD1533] transition-colors"
                onClick={() => setLightboxImage(selectedSubsection.visualReference!.url)}
              >
                <img
                  src={selectedSubsection.visualReference.url || "/placeholder.svg"}
                  alt={selectedSubsection.visualReference.description}
                  className="w-full max-w-md mx-auto"
                />
              </div>
            </div>
          )}

          {selectedSection.subsections && selectedSection.subsections.length > 1 && (
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-medium text-[#343e47] mb-4">More in this section:</h3>
              <div className="space-y-2">
                {selectedSection.subsections
                  .filter(sub => sub.number !== selectedSubsection.number)
                  .map((subsection) => (
                    <button
                      key={subsection.number}
                      onClick={() => handleSubsectionClick(subsection)}
                      className="block w-full text-left p-4 hover:bg-gray-50 transition-colors border-b border-gray-200"
                    >
                      <span className="text-[#DD1533] font-medium">{subsection.number}</span>
                      <span className="text-[#343e47] ml-2 font-medium">{subsection.title}</span>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

  const renderChatView = () => (
    <div className="py-8">
      <ScrollArea className="h-[500px] mb-6">
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              {message.type === "user" ? (
                <div className="bg-[#DD1533] text-white rounded-2xl px-6 py-3 max-w-[70%]">
                  <p className="text-sm">{message.content}</p>
                </div>
              ) : (
                <div className="max-w-[80%]">
                  <div className="bg-gray-50 text-[#343e47] rounded-2xl px-6 py-4 mb-4">
                    <p className="text-sm">{message.content}</p>
                  </div>

                  {message.hasDetailedContent && message.detailedContent && (
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <ScrollArea className="max-h-[400px]">
                        <div className="whitespace-pre-line text-sm leading-relaxed text-[#343e47] pr-4">
                          {message.detailedContent}
                        </div>

                        {message.hasVisualReference && message.visualReferenceUrl && (
                          <div className="mt-4">
                            <p className="text-xs font-medium text-[#343e47] mb-2">Visual Reference:</p>
                            <div
                              className="border border-gray-200 rounded-lg p-2 cursor-pointer hover:border-[#DD1533] transition-colors"
                              onClick={() => setLightboxImage(message.visualReferenceUrl!)}
                            >
                              <img
                                src={message.visualReferenceUrl || "/placeholder.svg"}
                                alt="Visual reference"
                                className="w-full max-w-xs"
                              />
                            </div>
                          </div>
                        )}
                      </ScrollArea>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-50 rounded-2xl px-6 py-4">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-[#DD1533] rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-[#DD1533] rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-[#DD1533] rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>
    </div>
  )

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-[#DD1533] rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-medium text-[#343e47]">Carey</span>
        </div>

        <div className="space-y-1">
          {brandSections.map((section) => (
            <button
              key={section.number}
              onClick={() => handleSectionClick(section)}
              className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
            >
              <div className="flex flex-col">
                <span className="text-[#DD1533] text-sm font-medium group-hover:text-[#c41230] transition-colors">
                  {section.number}.
                </span>
                <span className="text-[#343e47] text-sm group-hover:text-black transition-colors">{section.title}</span>
              </div>
            </button>
          ))}

          
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
  <div className="flex-1 p-8 transition-all duration-300 overflow-hidden min-h-0 max-h-[calc(100vh-140px)]">
    <div className="h-full flex flex-col">
      {currentView === "home" && renderHomeView()}
      {currentView === "section" && renderSectionView()}
      {currentView === "subsection" && renderSubsectionView()}
      {currentView === "chat" && renderChatView()}
    </div>
  </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex gap-3 items-center">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about brand colors, typography, voice guidelines..."
                className="w-full border border-gray-200 focus:border-gray-300 focus:ring-0 rounded-full px-6 py-4 text-sm pr-12 transition-all duration-200"
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-[#DD1533] hover:bg-[#c41230] text-white rounded-full px-6 py-4 transition-all duration-200"
            >
              <Send className="w-4 h-4" />
            </Button>
            <span className="text-xs text-gray-400 ml-2 align-baseline">Updated: May 25, 2025</span>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-300"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] p-4">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-2 -right-2 w-8 h-8 bg-[#DD1533] text-white rounded-full flex items-center justify-center hover:bg-[#c41230] transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src={lightboxImage || "/placeholder.svg"}
              alt="Visual reference"
              className="max-w-full max-h-full object-contain bg-white rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )

  // Demonstration of keyword recognition
  useEffect(() => {
    // Simulate testing the keyword searches after a short delay
    const timer = setTimeout(() => {
      if (messages.length === 0) {
        // Add demonstration messages showing keyword recognition
        const demoMessages: Message[] = [
          {
            id: "demo-1",
            type: "user",
            content: "section 4.3",
          },
          {
            id: "demo-2",
            type: "assistant",
            content: "Here's the complete content for section 4.3 Asset-Specific Layout Behavior:",
            hasDetailedContent: true,
            detailedContent: `4.3 Asset-Specific Layout Behavior

The 5-column grid is divided to serve distinct layout purposes:

• Columns 1 and 2 (left-most columns) are reserved for visual support content—stats, callouts, iconography, labels, or other standout elements
• Columns 3–5 (right side) house the primary body copy, aligned flush left within these columns

📌 Never place narrative content into Column 1 and half of 2 unless the layout type dictates otherwise. Always refer to design templates for guidance.

eBook Template Behavior:
The eBook template follows a structured approach where visual elements occupy the left columns while narrative content flows through the right columns. This creates a consistent reading experience with supporting visuals that enhance comprehension without interrupting the main content flow.

Key eBook Guidelines:
• Use Column 1 for chapter numbers, section markers, or key statistics
• Column 2 can house pull quotes, callout boxes, or supporting icons
• Columns 3-5 contain the primary narrative, maintaining consistent left alignment
• Never break the grid for decorative purposes—every element must serve the content

Whitepaper Template Behavior:
Whitepapers require a more authoritative layout that balances credibility with accessibility. The grid system supports this by creating clear hierarchies and logical content progression.

Whitepaper Specifications:
• Column 1: Reserved for section numbering and key metrics
• Column 2: Supporting data points, charts legends, or methodology notes
• Columns 3-5: Primary research content, findings, and analysis
• Maintain consistent spacing between sections to support scanning behavior
• Use grid alignment to create visual relationships between data and narrative

One-Pager Template Behavior:
One-pagers demand maximum impact within minimal space. The grid system ensures every element contributes to the overall message while maintaining visual clarity.

One-Pager Requirements:
• Column 1: Primary statistics or key performance indicators
• Column 2: Supporting visuals, icons, or secondary metrics
• Columns 3-5: Concise narrative that supports the visual elements
• Prioritize scannable content—use the grid to create clear reading paths
• Avoid cramming—respect whitespace as a design element

Case Study Template Behavior:
Case studies must balance storytelling with credible data presentation. The grid supports this dual purpose by creating space for both narrative flow and supporting evidence.

Case Study Structure:
• Column 1: Challenge/solution indicators, timeline markers
• Column 2: Key metrics, before/after comparisons, client quotes
• Columns 3-5: Narrative progression from challenge through solution to results
• Use consistent grid alignment to show cause-and-effect relationships
• Maintain visual hierarchy that guides readers through the success story

Template-Specific Notes:
Each template type has unique requirements, but all must respect the fundamental grid structure. Deviations should only occur when specifically designed into the template system and approved by the Creative team.

Cross-Template Consistency:
• All templates share the same 5-column, 8-row base structure
• Gutter spacing remains consistent across all formats
• Margin discipline applies equally to all template types
• Visual hierarchy principles scale appropriately for each format

Implementation Guidelines:
When working within any template, always start with the grid as your foundation. Content should flow naturally within the column structure, with visual elements supporting rather than competing with the primary message.

Quality Control:
Before finalizing any layout, verify that:
• All elements align to the grid structure
• Column usage follows template-specific guidelines
• Visual hierarchy supports content comprehension
• Whitespace is used intentionally, not as filler
• The layout serves the content's purpose effectively`,
          },
          {
            id: "demo-3",
            type: "assistant",
            content:
              "As you can see, this section contains extensive details about each template type. You can scroll through the complete content above. What other section would you like to explore?",
          },
        ]

        setMessages(demoMessages)
        setCurrentView("chat")
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [messages.length])
}
