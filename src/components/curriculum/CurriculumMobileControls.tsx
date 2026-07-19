"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, BookOpen, Layers, Target, Flag, Award, Share2, BookText } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader
} from "@/components/ui/sheet";

export function CurriculumMobileControls() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const navItems = [
    { name: 'Overview curricular', href: '/program/curriculum', icon: BookOpen, exact: true },
    { name: 'Niveluri', href: '/program/curriculum/levels', icon: Layers },
    { name: 'Business Pillars', href: '/program/curriculum/pillars', icon: Target },
    { name: 'Founder Rounds', href: '/program/curriculum/rounds', icon: Flag },
    { name: 'Mastery', href: '/program/curriculum/mastery', icon: Award },
    { name: 'Harta conectată', href: '/program/curriculum/map', icon: Share2 },
    { name: 'Glosar', href: '/program/curriculum/glossary', icon: BookText },
  ];

  return (
    <div className="md:hidden sticky top-16 z-40 bg-[#0B1E21] border-b border-[#1A363A] px-4 py-3 flex items-center justify-between text-white">
      <div className="text-sm font-serif font-bold uppercase tracking-wider">Atlas curricular</div>
      
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger render={
          <button className="flex items-center gap-2 text-sm font-medium text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors border border-[#1A363A]">
            <Menu className="w-4 h-4" />
            Navigare
          </button>
        } />
        <SheetContent side="bottom" className="h-[80vh] bg-[#0D2427] text-white rounded-t-2xl px-0 py-6 border-t border-[#1A363A] flex flex-col">
          <SheetHeader className="px-6 mb-4 text-left">
            <SheetTitle className="text-xl font-serif font-bold text-white">Atlas curricular</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = item.exact 
                  ? pathname === item.href 
                  : pathname.startsWith(item.href);
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors",
                      isActive 
                        ? "bg-brand-orange/10 text-brand-orange border-brand-orange/20" 
                        : "text-[#B2C0B8] hover:bg-white/5 bg-[#0B1E21] border border-[#1A363A]"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5", isActive ? "text-brand-orange" : "text-[#B2C0B8]")} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-8 mb-4 border-t border-[#1A363A] pt-6 px-2">
              <Link 
                href="/program" 
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-[#B2C0B8] hover:text-white transition-colors flex items-center gap-2"
              >
                &larr; Înapoi la Programul EZPLAY
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
