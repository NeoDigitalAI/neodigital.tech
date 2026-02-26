"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Facebook, Instagram, Linkedin, Moon, Send, Sun, Twitter } from "lucide-react"
import { useLang } from "@/lib/lang-context"

function Footerdemo() {
  const [isDarkMode, setIsDarkMode] = React.useState(true)
  const { t } = useLang()

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <footer className="relative border-t border-white/[0.1] bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">{t("footerStayConnected")}</h2>
            <p className="mb-6 text-muted-foreground">
              {t("footerNewsletterDesc")}
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder={t("footerEmailPlaceholder")}
                className="pr-12 backdrop-blur-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">{t("footerSubscribe")}</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t("footerQuickLinks")}</h3>
            <nav className="space-y-2 text-sm">
              <a href="#home" className="block transition-colors hover:text-primary">
                {t("navHome")}
              </a>
              <a href="#services" className="block transition-colors hover:text-primary">
                {t("navServices")}
              </a>
              <a href="#work" className="block transition-colors hover:text-primary">
                {t("navPortfolio")}
              </a>
              <a href="#process" className="block transition-colors hover:text-primary">
                {t("navProcess")}
              </a>
              <a href="#contact" className="block transition-colors hover:text-primary">
                {t("navContact")}
              </a>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t("footerCompanyDetails")}</h3>
            <address className="space-y-3 text-sm not-italic">
              <div className="space-y-1">
                <p className="font-semibold text-purple-400">INNOVATEX NEST TREND S.R.L.</p>
                <p className="text-muted-foreground">CUI: 43049318 | J12/2020/004152235</p>
              </div>
              <div className="space-y-1 text-muted-foreground">
                <p className="flex items-center gap-2">
                  <span className="text-purple-400/60">📍</span>
                  Str. Pavel Roșca Nr. 9, Cluj-Napoca, Cluj, {t("footerCountry")}
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-purple-400/60">📞</span>
                  <a href="tel:+40799977755" className="hover:text-purple-400 transition-colors">+40 799 977 755</a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-purple-400/60">✉️</span>
                  <a href="mailto:office@neodigital.tech" className="hover:text-purple-400 transition-colors">office@neodigital.tech</a>
                </p>
              </div>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">{t("footerFollowUs")}</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Facebook className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Facebook</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Twitter className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Twitter / X</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Instagram className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Instagram</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>LinkedIn</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
{/* dark mode toggle removed */}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.1] pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 NeoDigital.tech — INNOVATEX NEST TREND S.R.L. | CUI 43049318 | Cluj-Napoca, {t("footerCountry")}
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="transition-colors hover:text-primary">
              {t("footerPrivacy")}
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              {t("footerTerms")}
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footerdemo }
