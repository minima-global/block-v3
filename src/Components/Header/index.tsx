import { useContext, useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import HamburgerButton from './HamburgerButton.tsx'
import { appContext } from '../../AppContext.tsx'
import useAndroidShowTitleBar from '../TitleBar/useAndroidShowTitlebar';

const HEADER_NAV = [
  {
    title: 'Dashboard',
    href: '/',
  },
  {
    title: 'Transactions',
    href: '/transactions',
  },
  {
    title: 'Blocks',
    href: '/blocks',
  },
]

const Header = () => {
  const pathName = '___'
  const { topBlock, hamburgerOpen, setHamburgerOpen } = useContext(appContext)
  const [isAtTop, setIsAtTop] = useState(true)
  const openTitleBar = useAndroidShowTitleBar();

  useEffect(() => {
    const onScroll = () => {
      setIsAtTop(window.scrollY <= 30)
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (hamburgerOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [hamburgerOpen])

  const toggle = () => {
    setHamburgerOpen((prevState) => !prevState);
  }

  const toggleDarkMode = (evt: React.MouseEvent<HTMLLIElement>) => {
    evt.stopPropagation();

    document.body.classList.remove('bg-background')

    if (document.body.classList.contains('dark')) {
      document.body.classList.remove('dark')
      document.body.classList.add('bg-white')
    } else {
      document.body.classList.add('dark')
      document.body.classList.add('dark:bg-background')
    }

    localStorage.setItem(
      'darkMode',
      (!!document.body.classList.contains('dark')).toString()
    )
  }

  return (
    <>
      <header className="sticky top-0 z-50 h-[64px]" onClick={openTitleBar}>
        <div
          className={`${isAtTop ? 'h-[84px]' : 'h-[40px]'} border-[hsla(0, 0%, 100%, 1)] flex h-[64px] items-center border-b bg-white px-5 transition-all dark:border-lightDarkContrast dark:bg-black`}
        >
          <div className="container relative z-50 mx-auto">
            <div className="grid w-full grid-cols-12">
              <div className="col-span-6 flex items-center">
                <Link to="/" className="flex items-center gap-5 text-xs">
                  <svg
                    width="37"
                    height="33"
                    viewBox="0 0 37 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${isAtTop ? '' : 'w-[28px]'} fill-black transition-all dark:fill-white`}
                  >
                    <path
                      d="M28.8727 9.20966L27.2806 16.2518L25.2445 7.7553L18.1105 4.86191L16.1816 13.3737L14.4823 3.39225L7.34831 0.51416L0 32.9998H7.79227L10.0427 23.0183L11.742 32.9998H19.5496L21.4632 24.488L23.4993 32.9998H31.2915L36.022 12.0877L28.8727 9.20966Z"
                      fill="#currentColor"
                    />
                  </svg>
                  <div className="mt-1">
                    <span className="flex">
                      <div className="gradient-border flex items-center bg-white text-black dark:bg-black dark:text-white">
                        Block{' '}
                        {!topBlock && (
                          <div className="skele skele--light ml-2 h-[14px] w-[43px]" />
                        )}
                        {topBlock && (
                          <span className="ml-1 font-bold text-orange dark:text-lightOrange">
                            {topBlock}
                          </span>
                        )}
                      </div>
                    </span>
                  </div>
                </Link>
              </div>
              <div className="col-span-6 flex items-center justify-end">
                <div className="flex lg:hidden">
                  <HamburgerButton isOpen={hamburgerOpen} toggle={toggle} />
                </div>
                <nav className="hidden cursor-pointer lg:block">
                  <ul
                    className={`${isAtTop ? 'gap-7' : 'gap-5'} flex items-center text-sm transition-all`}
                  >
                    {HEADER_NAV.map(({ title, href }) => {
                      const isOnPage =
                        pathName === href ||
                        (pathName && pathName.includes(href) && href !== '/')

                      return (
                        <li
                          key={title}
                          className={`w-full transition-all duration-300 ${isOnPage ? 'text-orange dark:text-lightOrange' : 'text-black dark:text-white dark:hover:text-grey40'}`}
                        >
                          <Link to={href} onClick={(evt) => evt.stopPropagation()}>{title}</Link>
                        </li>
                      )
                    })}
                    <li onClick={toggleDarkMode}>
                      <div
                        className={`${!isAtTop ? 'scale-[0.8]' : ''} relative flex h-[44px] w-[44px] scale-100 items-center justify-center rounded-full border border-grey80 bg-white from-[#17191C] to-[#37393F] transition-all duration-75 hover:bg-grey10 active:scale-75 dark:border-mediumDarkContrast dark:bg-darkContrast dark:hover:bg-transparent dark:hover:bg-gradient-to-t`}
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="invisible absolute scale-0 transition-all delay-150 duration-150 dark:visible dark:scale-100"
                        >
                          <path
                            d="M11 14C11.8333 14 12.5417 13.7083 13.125 13.125C13.7083 12.5417 14 11.8333 14 11C14 10.1667 13.7083 9.45833 13.125 8.875C12.5417 8.29167 11.8333 8 11 8C10.1667 8 9.45833 8.29167 8.875 8.875C8.29167 9.45833 8 10.1667 8 11C8 11.8333 8.29167 12.5417 8.875 13.125C9.45833 13.7083 10.1667 14 11 14ZM11 15.5C9.75133 15.5 8.68917 15.0622 7.8135 14.1865C6.93783 13.3108 6.5 12.2487 6.5 11C6.5 9.75133 6.93783 8.68917 7.8135 7.8135C8.68917 6.93783 9.75133 6.5 11 6.5C12.2487 6.5 13.3108 6.93783 14.1865 7.8135C15.0622 8.68917 15.5 9.75133 15.5 11C15.5 12.2487 15.0622 13.3108 14.1865 14.1865C13.3108 15.0622 12.2487 15.5 11 15.5ZM4 11.75H0.25V10.25H4V11.75ZM21.75 11.75H18V10.25H21.75V11.75ZM10.25 4V0.25H11.75V4H10.25ZM10.25 21.75V18H11.75V21.75H10.25ZM5.573 6.577L3.23075 4.3155L4.2905 3.20575L6.54625 5.523L5.573 6.577ZM17.7095 18.7943L15.4385 16.4615L16.427 15.423L18.7693 17.6845L17.7095 18.7943ZM15.423 5.573L17.6845 3.23075L18.7943 4.2905L16.477 6.54625L15.423 5.573ZM3.20575 17.7095L5.5385 15.4385L6.55775 16.427L4.30575 18.7788L3.20575 17.7095Z"
                            fill="#E9E9EB"
                          />
                        </svg>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="visible absolute scale-100 transition-all delay-150 duration-150 dark:invisible dark:scale-0"
                        >
                          <path
                            d="M9.02905 17.5C6.66805 17.5 4.66113 16.6736 3.0083 15.0207C1.35563 13.3681 0.529297 11.3611 0.529297 8.99998C0.529297 6.73714 1.29688 4.79647 2.83205 3.17797C4.36721 1.55931 6.24696 0.68264 8.4713 0.547974C8.61496 0.547974 8.75605 0.55314 8.89455 0.563474C9.03288 0.573807 9.16871 0.589224 9.30205 0.609724C8.79188 1.08656 8.38555 1.66281 8.08305 2.33847C7.78038 3.01414 7.62905 3.73464 7.62905 4.49997C7.62905 6.13881 8.20271 7.53189 9.35005 8.67922C10.4972 9.82639 11.8902 10.4 13.529 10.4C14.3047 10.4 15.0278 10.2487 15.6983 9.94623C16.3688 9.64356 16.9393 9.23714 17.4098 8.72697C17.4303 8.86031 17.4457 8.99623 17.456 9.13473C17.4662 9.27306 17.4713 9.41406 17.4713 9.55772C17.3431 11.7821 16.4698 13.6618 14.8513 15.197C13.2326 16.7323 11.2919 17.5 9.02905 17.5ZM9.02905 16C10.4957 16 11.8124 15.5958 12.979 14.7875C14.1457 13.9791 14.9957 12.925 15.529 11.625C15.1957 11.7083 14.8624 11.775 14.529 11.825C14.1957 11.875 13.8624 11.9 13.529 11.9C11.479 11.9 9.73321 11.1791 8.29155 9.73747C6.84988 8.29581 6.12905 6.54997 6.12905 4.49997C6.12905 4.16664 6.15405 3.83331 6.20405 3.49997C6.25405 3.16664 6.32071 2.83331 6.40405 2.49997C5.10405 3.03331 4.04988 3.88331 3.24155 5.04997C2.43321 6.21664 2.02905 7.53331 2.02905 8.99998C2.02905 10.9333 2.71238 12.5833 4.07905 13.95C5.44571 15.3166 7.09571 16 9.02905 16Z"
                            fill="#08090B"
                          />
                        </svg>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="flex lg:hidden">
        {hamburgerOpen && (
          <nav className="fixed left-0 top-0 z-10 h-screen w-screen bg-black pt-20 text-white">
            <div className="p-8">
              <ul className="flex flex-col text-2xl">
                {HEADER_NAV.map(({ title, href }) => {
                  const isOnPage =
                    pathName === href ||
                    (pathName && pathName.includes(href) && href !== '/')

                  return (
                    <li
                      key={title}
                      className={`w-full ${isOnPage ? 'text-orange dark:text-lightOrange' : ''}`}
                    >
                      <Link
                        to={href}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggle();
                        }}
                        className="block w-full px-5 py-4"
                      >
                        {title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>
        )}
      </div>
      <div className="h-[20px]" />
    </>
  )
}

export default Header
