import i18next from "i18next";
import { AppWindow, Globe, HardDrive, Languages, LayoutDashboard, LogOut, Puzzle, Settings, SunIcon } from "lucide-react";
import { GithubIcon } from '@/components/bs-icons/github';
import { BookOpenIcon } from '@/components/bs-icons/bookOpen';
import { SystemIcon } from "@/components/bs-icons/system";
import { ApplicationIcon } from "@/components/bs-icons/application";
import { TechnologyIcon } from "@/components/bs-icons/technology";
import { KnowledgeIcon } from "@/components/bs-icons/knowledge";
import { ModelIcon } from "@/components/bs-icons/model";
import { MoonIcon } from "@/components/bs-icons/moon";
import { QuitIcon } from "@/components/bs-icons/quit";
import { EnIcon } from "@/components/bs-icons/en";

import { useContext, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import CrashErrorComponent from "../components/CrashErrorComponent";
import { Separator } from "../components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { darkContext } from "../contexts/darkContext";
import { userContext } from "../contexts/userContext";
import { logoutApi } from "../controllers/API/user";
import { captureAndAlertRequestErrorHoc } from "../controllers/request";
import { User } from "../types/api/user";

export default function MainLayout() {
    const { dark, setDark } = useContext(darkContext);
    // 角色
    const { user, setUser } = useContext(userContext);
    const location = useLocation();
    const { language, options, changLanguage, t } = useLanguage(user)

    const handleLogout = () => {
        captureAndAlertRequestErrorHoc(logoutApi()).then(_ => {
            setUser(null)
            localStorage.removeItem('isLogin')
        })
    }

    return <div className="flex">
        <div className="bg-[#f4f5f8] w-full h-screen">
            <div className="flex justify-between h-[64px]">
                <div className="flex h-9 my-[14px]">
                    <Link className="inline-block" to='/'><img src='/login-logo-small.png' className="w-[114px] h-9 ml-8 rounded" alt="" /></Link>
                </div>
                <div className="flex w-fit">
                    {/* <div className="flex">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className="h-8 w-8 bg-[white] rounded-lg cursor-pointer my-4">
                                    <div className="" onClick={() => setDark(!dark)}>
                                        {dark ? (
                                            <SunIcon className="side-bar-button-size mx-auto w-[13px] h-[13px]" />
                                        ) : (
                                            <MoonIcon className="side-bar-button-size mx-auto w-[17px] h-[17px]" />
                                        )}
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent><p>{t('menu.themeSwitch')}</p></TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <Separator className="mx-[4px]" orientation="vertical" />
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className="h-8 w-8 bg-[white] rounded-lg cursor-pointer my-4">
                                    <div className="" onClick={changLanguage}>
                                        {language === 'en'
                                            ? <EnIcon className="side-bar-button-size mx-auto w-[19px] h-[19px]" />
                                            : <Globe className="side-bar-button-size mx-auto w-[17px] h-[17px]" />}
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent><p>{options[language]}</p></TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <Separator className="mx-[23px] h-6 border-l my-5 border-[#dddddd]" orientation="vertical" />
                    </div> */}
                    <div className="flex items-center h-7 my-4">
                        <img className="h-7 w-7 rounded-2xl mr-4" src="/user.png" alt="" />
                        <span className="leading-8 text-[14px] mr-8">{t("menu.user")}</span>
                    </div>
                </div>
            </div>
            <div className="flex" style={{ height: "calc(100vh - 64px)" }}>
                <div className="relative z-10 bg-[#f4f5f8] h-full w-[184px] min-w-[184px] px-3  shadow-x1 flex justify-between text-center ">
                    <nav className="">
                        <NavLink to='/' className={`navlink inline-flex rounded-lg w-full px-6 hover:bg-[white] h-12 mb-[3.5px]`}>
                            <ApplicationIcon className="h-6 w-6 my-[12px]" /><span className="mx-[14px] max-w-[48px] text-[14px] leading-[48px]">{t('menu.app')}</span>
                        </NavLink>
                        <NavLink to='/build' className={`navlink inline-flex rounded-lg w-full px-6 hover:bg-[white] h-12 mb-[3.5px]`} >
                            <TechnologyIcon className="h-6 w-6 my-[12px]" /><span className="mx-[14px] max-w-[48px] text-[14px] leading-[48px]">{t('menu.skills')}</span>
                        </NavLink>
                        <NavLink to='/filelib' className={`navlink inline-flex rounded-lg w-full px-6 hover:bg-[white] h-12 mb-[3.5px]`}>
                            <KnowledgeIcon className="h-6 w-6 my-[12px]" /><span className="mx-[14px] max-w-[48px] text-[14px] leading-[48px]">{t('menu.knowledge')}</span>
                        </NavLink>
                        <NavLink to='/model' className={`navlink inline-flex rounded-lg w-full px-6 hover:bg-[white] h-12 mb-[3.5px]`}>
                            <ModelIcon className="h-6 w-6 my-[12px]" /><span className="mx-[14px] max-w-[48px] text-[14px] leading-[48px]">{t('menu.models')}</span>
                        </NavLink>
                        {
                            user.role === 'admin' && <>
                                <NavLink to='/sys' className={`navlink inline-flex rounded-lg w-full px-6 hover:bg-[white] h-12 mb-[3.5px]`}>
                                    <SystemIcon className="h-6 w-6 my-[12px]" /><span className="mx-[14px] max-w-[48px] text-[14px] leading-[48px]">{t('menu.system')}</span>
                                </NavLink>
                            </>
                        }
                    </nav>
                    <div className="absolute left-0 bottom-0 w-[180px] p-2">
                        {/* <Separator /> */}
                        <div className="flex  items-between my-3">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger className="h-[72px] w-[78px] cursor-pointer bg-[white] rounded-lg hover:bg-[#1b1f23] hover:text-[white] transition-all">
                                        <Link to={"https://github.com/dataelement/bisheng"} target="_blank">
                                            <GithubIcon className="side-bar-button-size mx-auto w-5 h-5 " />
                                            <span className="block text-[12px] mt-[8px] font-bold">{t("menu.github")}</span>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent><p>{t("menu.github")}</p></TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <Separator className="mx-1" orientation="vertical" />
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger className="h-[72px] w-[78px] cursor-pointer bg-[white] rounded-lg p-0 align-top hover:bg-[#0055e3] hover:text-[white]  transition-all">
                                        <Link className="m-0 p-0" to={"https://m7a7tqsztt.feishu.cn/wiki/ZxW6wZyAJicX4WkG0NqcWsbynde"} target="_blank">
                                            <BookOpenIcon className=" mx-auto w-5 h-5" />
                                            <span className="block text-[12px] mt-[8px] font-bold">{t("menu.bookopen")}</span>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent><p>{t('menu.document')}</p></TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <Separator className="mx-1" />
                        <div className="flex h-[48px] w-[160px]">
                            <div className="flex-1 py-1  flex justify-center bg-[#EBEDF1] hover:bg-gray-400 gap-2 items-center rounded-md cursor-pointer" onClick={handleLogout}>
                                <QuitIcon className="side-bar-button-size" />
                                <span>{t('menu.logout')}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1  bg-[white] rounded-lg w-[calc(100vw-184px)]">
                    <ErrorBoundary
                        onReset={() => window.location.href = window.location.href}
                        FallbackComponent={CrashErrorComponent}
                    >
                        <Outlet />
                    </ErrorBoundary>
                </div>
            </div>
        </div>

        {/* // mobile */}
        <div className="fixed w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.4)] sm:hidden text-sm">
            <div className="w-10/12 bg-gray-50 mx-auto mt-[30%] rounded-xl px-4 py-10">
                <p className=" text-sm text-center">{t('menu.forBestExperience')}</p>
                <div className="flex mt-8 justify-center gap-4">
                    <a href={"https://github.com/dataelement/bisheng"} target="_blank">
                        <GithubIcon className="side-bar-button-size mx-auto" />Github
                    </a>
                    <a href={"https://m7a7tqsztt.feishu.cn/wiki/ZxW6wZyAJicX4WkG0NqcWsbynde"} target="_blank">
                        <BookOpenIcon className="side-bar-button-size mx-auto" /> {t('menu.onlineDocumentation')}
                    </a>
                </div>
            </div>
        </div>
    </div>
};

const useLanguage = (user: User) => {
    const [language, setLanguage] = useState('en')
    useEffect(() => {
        const lang = user.user_id ? localStorage.getItem('language-' + user.user_id) : null
        if (lang) {
            setLanguage(lang)
        }
    }, [user])

    const { t } = useTranslation()
    const changLanguage = () => {
        const ln = language === 'zh' ? 'en' : 'zh'
        setLanguage(ln)
        localStorage.setItem('language-' + user.user_id, ln)
        localStorage.setItem('language', ln)
        i18next.changeLanguage(ln)
    }
    return {
        language,
        options: { en: '使用中文', zh: 'English' },
        changLanguage,
        t
    }
}