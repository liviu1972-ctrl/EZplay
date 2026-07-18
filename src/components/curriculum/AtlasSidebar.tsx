"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Layers, Target, Flag, Award, BookText, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AtlasSidebar() {
  const pathname = usePathname();

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
    <aside className="w-[280px] shrink-0 border-r border-line/60 bg-surface h-[calc(100vh-64px)] overflow-y-auto sticky top-16 hidden md:flex flex-col py-6">
      <div className="px-6 mb-4">
        <h2 className="text-sm font-bold tracking-wider text-ink-muted uppercase">Atlas Curricular</h2>
      </div>
      <nav className="flex flex-col gap-1 px-4">
        {navItems.map((item) => {
          const isActive = item.exact 
            ? pathname === item.href 
            : pathname.startsWith(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-brand-orange/10 text-brand-orange" 
                  : "text-ink hover:bg-black/5 dark:hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive ? "text-brand-orange" : "text-ink-muted")} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto px-6 pt-6 border-t border-line/60">
        <Link href="/program" className="text-xs font-medium text-ink-muted hover:text-ink transition-colors flex items-center gap-2">
          &larr; Înapoi la Programul EZPLAY
        </Link>
      </div>
    </aside>
  );
}
