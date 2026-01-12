import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const { i18n } = useTranslation();
    const [isDark, setIsDark] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

    // Initial check for dark mode
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        if (newIsDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const toggleLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        setIsLangMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-solid border-slate-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
            <div className="mx-auto max-w-[1600px]  h-16 flex items-center justify-between">

                {/* Left Section: Logo & Search */}
                <div className="flex items-center gap-8">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 text-slate-900 dark:text-white group">
                        <div className="size-8 text-primary">
                            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h2 className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white">PolyBull</h2>
                    </Link>

                    {/* Search Bar - Hidden on small screens */}
                    <label className="hidden md:flex flex-col min-w-40 h-10 w-80 max-w-[400px] relative group">
                        <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 group-focus-within:ring-2 ring-primary/50 transition-all">
                            <div className="text-slate-500 flex items-center justify-center pl-3">
                                <span className="material-symbols-outlined text-[20px]">search</span>
                            </div>
                            <input
                                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg bg-transparent border-none text-sm font-normal leading-normal px-3 text-slate-900 dark:text-gray-100 placeholder:text-slate-500 focus:outline-none focus:ring-0"
                                placeholder="Search"
                            />
                        </div>
                    </label>
                </div>

                {/* Right Section: Nav & Profile & Actions */}
                <div className="flex items-center justify-end gap-6">
                    {/* Navigation */}
                    <nav className="hidden lg:flex items-center gap-6">
                        <Link to="/" className="text-slate-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors">Home</Link>
                        <Link to="/analysis" className="text-slate-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors">Analysis</Link>
                        <Link to="/analysis-in" className="text-slate-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors">Reports</Link>
                        <a href="#" className="text-slate-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors">Settings</a>
                    </nav>

                    {/* User & Actions */}
                    <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">

                        {/* Action Buttons (Theme/Lang) integrated nicely */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                                title="Toggle Theme"
                            >
                                {isDark ? <Moon className="size-5" /> : <Sun className="size-5" />}
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                    className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                                    title="Switch Language"
                                >
                                    <Globe className="size-5" />
                                </button>
                                {isLangMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-32 rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 z-50">
                                        <button onClick={() => toggleLanguage('en')} className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 first:rounded-t-lg">English</button>
                                        <button onClick={() => toggleLanguage('zh')} className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 last:rounded-b-lg">中文</button>
                                    </div>
                                )}
                                {isLangMenuOpen && <div className="fixed inset-0 z-40" onClick={() => setIsLangMenuOpen(false)}></div>}
                            </div>
                        </div>

                        {/* User Profile */}
                        <div className="flex flex-col items-end hidden sm:flex">
                            <span className="text-xs font-semibold text-slate-900 dark:text-white">Alex Morgan</span>
                            <span className="text-[10px] text-slate-500">Pro Plan</span>
                        </div>
                        <div
                            className="bg-center bg-no-repeat bg-cover rounded-full size-9 ring-2 ring-slate-100 dark:ring-slate-700"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuATghx1ioYJZjh9P8vDdpKOY8IVVNBo2vXgHiYnvoHBct2QgWeyZorJrKkWtWtneNcxCAhArwtkMt8h-GdvzWfJulCAz5fX4xHiz-HLofThb_xCVypwNV6-NiLGIgAlQLhr6pnVSS2As8fNP-FI5na_PQQnbK--8eMjdWgtZwHoTyCk3_4T2x6F1WfMAZXo7j139T6jr5uqs1tt_scbmfKlaqv-x6f_hxx57LZtXofye3_Pc7j6xbXwTw0s3U2byn8U2rU1LH0Kq9CB")' }}
                        ></div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
