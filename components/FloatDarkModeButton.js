import { useEffect, useState } from 'react'
import { loadUserThemeFromCookies, saveTheme, useGlobal } from '@/lib/global'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function FloatDarkModeButton () {
  const [show, switchShow] = useState(false)
  const scrollListener = () => {
    const scrollY = window.pageYOffset
    // const shouldShow = scrollY > 100 && scrollY < windowTop
    const shouldShow = scrollY > 100
    if (shouldShow !== show) {
      switchShow(shouldShow)
    }
  }
  useEffect(() => {
    document.addEventListener('scroll', scrollListener)
    return () => document.removeEventListener('scroll', scrollListener)
  })

  const { changeTheme } = useGlobal()
  const userTheme = loadUserThemeFromCookies()
  // 用户手动设置主题
  const handleChangeDarkMode = () => {
    const newTheme = userTheme === 'light' ? 'dark' : 'light'
    saveTheme(newTheme)
    changeTheme(newTheme)
  }

  return (
    <div
      onClick={handleChangeDarkMode}
      className={
        (show ? 'animate__fadeInRight ' : 'hidden lg:block') +
        ' px-3.5 py-3 animate__animated animate__faster shadow-card fixed right-3 bottom-36 z-10 duration-200 text-xs cursor-pointer rounded-xl' +
        ' text-black shadow-card dark:border-gray-500 glassmorphism dark:bg-gray-700 dark:text-gray-200'
      }
    >
      <FontAwesomeIcon
        icon={userTheme === 'dark' ? faSun : faMoon}
        id="darkModeButton"
        className="hover:scale-150 transform duration-200"
      />
    </div>
  )
}