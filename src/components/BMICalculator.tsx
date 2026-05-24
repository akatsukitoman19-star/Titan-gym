import React, { useState } from "react";
import { Calculator, Award, ArrowRight } from "lucide-react";

export default function BMICalculator() {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [advice, setAdvice] = useState<string>("");

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      alert("Please enter valid height and weight measurements.");
      return;
    }

    // Convert height from cm to meters
    const heightInMeters = h / 100;
    const finalBmi = w / (heightInMeters * heightInMeters);
    const roundedBmi = Math.round(finalBmi * 10) / 10;
    setBmi(roundedBmi);

    // Categories
    if (roundedBmi < 18.5) {
      setCategory("Underweight");
      setColor("text-blue-400 border-blue-500/30 bg-blue-500/5");
      setAdvice("Recommend high-protein muscle hypertrophy targeting at Titan floor alongside Head Coach strength training.");
    } else if (roundedBmi >= 18.5 && roundedBmi < 24.9) {
      setCategory("Healthy Weight");
      setColor("text-green-400 border-green-500/30 bg-green-500/5");
      setAdvice("Excellent condition. Perfect threshold for high performance, lean bodybuilding, or athletic functional CrossFit.");
    } else if (roundedBmi >= 25 && roundedBmi < 29.9) {
      setCategory("Overweight");
      setColor("text-yellow-500 border-yellow-500/30 bg-yellow-500/5");
      setAdvice("Optimize metabolic capacity. We recommend Pro Fat Cutting, aerobic stamina circuits, and custom keto tracking.");
    } else {
      setCategory("Obese Range");
      setColor("text-titan-red border-titan-red/30 bg-titan-red/5");
      setAdvice("Immediate metabolic intervention suggested. High-density conditioning, fat burning, and 1-on-1 coach support recommended.");
    }
  };

  const clearCalculator = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setCategory("");
    setAdvice("");
  };

  return (
    <div id="bmi-calculator-card" className="glass-card relative overflow-hidden rounded-2xl border border-white/10 p-8 md:p-10 transition-all duration-300 hover:border-titan-red/30">
      <div className="absolute top-0 right-0 -transtitan-y-1/2 translate-x-1/2 w-48 h-48 bg-titan-red/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-titan-red/10 border border-titan-red/20 rounded-xl">
          <Calculator className="w-6 h-6 text-titan-red" />
        </div>
        <div>
          <h4 className="font-display text-xl font-bold tracking-tight text-white">Instant Bio-Mass Status</h4>
          <p className="text-xs text-gray-400">Identify your current BMI threshold in seconds</p>
        </div>
      </div>

      <form onSubmit={calculateBMI} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Height (cm)</label>
          <div className="relative">
            <input
              type="number"
              placeholder="e.g. 175"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-titan-red focus:ring-1 focus:ring-titan-red/20 transition-all text-sm"
              required
              min="80"
              max="270"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-500">CM</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">Weight (kg)</label>
          <div className="relative">
            <input
              type="number"
              placeholder="e.g. 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-titan-red focus:ring-1 focus:ring-titan-red/20 transition-all text-sm"
              required
              min="20"
              max="250"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-500">KG</span>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-titan-red to-titan-orange text-white font-display font-semibold px-5 py-3 rounded-xl transition-all duration-300 hover:opacity-90 active:scale-95 shadow-lg shadow-titan-red/10 cursor-pointer text-sm"
          >
            Calculate BMI
          </button>
          
          {bmi && (
            <button
              type="button"
              onClick={clearCalculator}
              className="bg-zinc-900 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 px-4 py-3 rounded-xl text-sm transition-all cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </form>

      {bmi !== null && (
        <div className="mt-8 pt-6 border-t border-white/5 space-y-4 animate-slideup">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Index Result</span>
            <span className="text-3xl font-display font-black tracking-tight text-white glow-text">{bmi}</span>
          </div>

          <div className={`p-4 border rounded-xl flex items-center justify-between ${color}`}>
            <span className="text-sm font-semibold">Classification: {category}</span>
            <Award className="w-5 h-5 flex-shrink-0" />
          </div>

          <div className="p-4 bg-white/5 rounded-xl border border-white/5">
            <span className="block text-[11px] font-bold text-titan-orange uppercase tracking-widest mb-1">Tailored Counsel</span>
            <p className="text-xs text-gray-300 leading-relaxed">{advice}</p>
          </div>

          <div className="text-center pt-2">
            <a 
              href="#membership" 
              className="inline-flex items-center gap-1.5 text-xs text-titan-red hover:text-white transition-all font-semibold uppercase tracking-widest"
            >
              View Recommended Plans <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
