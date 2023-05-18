'use client'
import React, { Fragment, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from './components/sidebar'
import Character from './components/character'
import Inventory from './components/inventory'
import Map from './components/map'

import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/flyff-idle.appspot.com/o'

const navigation = [
  { name: 'Character', href: '#', icon: '/images%2Fclass%2Fold_male%2Fvagrant.png?alt=media&token=916ae091-f983-4558-b458-b755df67813b', current: true },
  { name: 'Inventory', href: '#', icon: '/images%2Fitem%2F624-syssysscrbagbag01.png?alt=media&token=ea58bbba-bc11-4648-a875-0cf399a0490e', current: false },
  { name: 'Map', href: '#', icon: '/images%2Fitem%2F7506-syssysquempdre3.png?alt=media&token=e8cc18ff-071c-4b5b-858c-82c9363f1115', current: false },
]
const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

const Page = () => {
    const { user } = useAuthContext()
    const router = useRouter()
        console.log(router)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [windowContent, setWindowContent] = useState(navigation[0])

    const classNames = (...classes) => {
      return classes.filter(Boolean).join(' ')
    }

    React.useEffect(() => {
        if (user == null) router.push("/")
    }, [user])

    return (
        <>
          <div className="font-mono">
            <Transition.Root show={sidebarOpen} as={Fragment}>
              <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-gray-900/80" />
                </Transition.Child>
    
                <div className="fixed inset-0 flex">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                  >
                    <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                          <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                            <span className="sr-only">Close sidebar</span>
                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                          </button>
                        </div>
                      </Transition.Child>
                      <Sidebar navigation={navigation} setWindowContent={setWindowContent}/>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>
    
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
              <Sidebar navigation={navigation} setWindowContent={setWindowContent}/>
            </div>
    
            <div className="lg:pl-72">
              <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
    
                {/* Separator */}
                <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />
    
                <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 place-content-between">
                  <div className="flex items-center font-extrabold" >
                    <img src={imageUrl + windowContent.icon} className="h-6 w-6 shrink-0 mr-4" aria-hidden="true" />
                    {windowContent.name}
                  </div>
                  <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
    
                    {/* Separator */}
                    <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />
    
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative">
                      <Menu.Button className="-m-1.5 flex items-center p-1.5">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full bg-gray-50"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                        <span className="hidden lg:flex lg:items-center">
                          <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                            Tom Cook
                          </span>
                          <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? 'bg-gray-50' : '',
                                    'block px-3 py-1 text-sm leading-6 text-gray-900'
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
    
              <main className="py-8">
                <div className="py-16 fixed top-0 max-h-screen">
                  {windowContent.name === "Character" && <Character/>}
                  {windowContent.name === "Inventory" && <Inventory/>}
                  {windowContent.name === "Map" && <Map/>}
                </div>
              </main>
            </div>
          </div>
        </>
      )
}

export default Page;