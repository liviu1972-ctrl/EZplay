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
    { name: 'Despre program', href: '/program', icon: BookOpen },
    { name: 'Overview curricular', href: '/program/curriculum', icon: BookOpen, exact: true },
    { name: 'Niveluri', href: '/program/curriculum/levels', icon: Layers },
    { name: 'Business Pillars', href: '/program/curriculum/pillars', icon: Target },
    { name: 'Founder Rounds', href: '/program/curriculum/rounds', icon: Flag },
    { name: 'Mastery', href: '/program/curriculum/mastery', icon: Award },
    { name: 'Harta conectată', href: '/program/curriculum/map', icon: Share2 },
    { name: 'Glosar', href: '/program/curriculum/glossary', icon: BookText },
  ];

  return (
    <div className="md:hidden sticky top-16 z-40 bg-surface border-b border-line/60 px-4 py-3 flex items-center justify-between">
      <div className="text-sm font-semibold text-ink">Curriculum Explorer</div>
      
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger render={
          <button className="flex items-center gap-2 text-sm font-medium text-ink bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors">
            <Menu className="w-4 h-4" />
            Navigare
          </button>
        } />
        <SheetContent side="bottom" className="h-[80vh] bg-surface rounded-t-2xl px-0 py-6 border-t border-line/60 flex flex-col">
          <SheetHeader className="px-6 mb-4 text-left">
            <SheetTitle className="text-xl font-bold font-heading">Atlas Curricular</SheetTitle>
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
                        ? "bg-brand-orange/10 text-brand-orange" 
                        : "text-ink hover:bg-black/5 dark:hover:bg-white/5 bg-canvas border border-line/40"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5", isActive ? "text-brand-orange" : "text-ink-muted")} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-8 mb-4 border-t border-line/60 pt-6 px-2">
              <Link 
                href="/program" 
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-ink-muted hover:text-ink transition-colors flex items-center gap-2"
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
