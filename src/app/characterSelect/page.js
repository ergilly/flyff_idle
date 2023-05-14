'use client'
import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline'
import getCurrentUser from '@/firebase/auth/currentUser';
import getData from "@/firebase/firestore/getData";

import CharacterCreate from './characterCreate'
import SelectCharacter from './selectYourCharacter';

const navigation = []
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

const Page = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    async function getUserData() {
      const {result, error} = await getCurrentUser()
      if(error) {
        return console.log(error);
      }
      await setUser(result)
    }
    getUserData()
  }, [])

  const [characters, setCharacters] = useState([])
  useEffect(() => {
    async function getCharacterData() {
      if(user && user.uid) {
        const {result, error} = await getData('user', user.uid)
        if(error) {
          return console.log(error);
        }
        const characterData = result.data().characters
        const updatedCharacters = characterData.length < 6 ? [...characterData, ...Array(6 - characterData.length).fill({0: 0})] : characterData;
        await setCharacters(updatedCharacters)
      }
    }
    getCharacterData()
  }, [user])

  const [rightColumnView, setRightColumnView] = useState('Select your Character')
  const [selected, setSelected] = useState(null)
  const router = useRouter()

  if(characters.length > 0) {
    return (
    <>
      <div className="flex min-h-full flex-col font-mono" >
      <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                  <div className="border-b border-gray-700">
                    <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10"
                            src="https://firebasestorage.googleapis.com/v0/b/flyff-idle.appspot.com/o/images%2Fapp%2Ficon.png?alt=media&token=d5cd9b2a-01a4-4912-b675-4c370a4dcc55"
                            alt="Your Company"
                          />
                        </div>
                        <div className="hidden md:block">
                          <div className="ml-10 flex items-baseline space-x-4">
                            {navigation.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                  'rounded-md px-3 py-2 text-sm font-medium'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          <button
                            type="button"
                            className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                          </button>

                          {/* Profile dropdown */}
                          <Menu as="div" className="relative ml-3">
                            <div>
                              <Menu.Button className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="sr-only">Open user menu</span>
                                <UserIcon className="h-6 w-6" aria-hidden="true" />
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {userNavigation.map((item) => (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <a
                                        href={item.href}
                                        className={classNames(
                                          active ? 'bg-gray-100' : '',
                                          'block px-4 py-2 text-sm text-gray-700'
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
                      <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                          ) : (
                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                          )}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                  <div className="space-y-1 px-2 py-3 sm:px-3">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block rounded-md px-3 py-2 text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={user ? user.photoURL : null} alt="" />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">{user ? user.displayName : null}</div>
                        <div className="text-sm font-medium leading-none text-gray-400">{user ? user.email : null}</div>
                      </div>
                      <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        

        {/* 3 column wrapper */}
        <div className="w-full grow lg:flex">
          {/* Left sidebar & main wrapper */}
          <div className="flex-1 xl:flex bg-gray-600">
            <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:w-64 xl:pl-6">
              {/* Left column area */}
            </div>

            <div className="xl:flex-1">
                
            <main className="bg-[url('https://firebasestorage.googleapis.com/v0/b/flyff-idle.appspot.com/o/images%2Fapp%2Ffrostiae-worldeditor-2019-11-19-20-59-23.jpg?alt=media&token=286cf729-3f83-4d02-b20b-38c489b5f8fd')] bg-no-repeat bg-cover bg-top h-full">
            {rightColumnView === 'Select your Character' && (
              <SelectCharacter
                characters={characters}
                selected={selected}
                setSelected={setSelected}
                setRightColumnView={setRightColumnView}
                router={router}
              />
            )}              
            { rightColumnView === 'Character Information' && <CharacterCreate router={router}/>}
            </main>
            </div>
          </div>
        </div>
      </div>
    </>
  )} else {return <></>}
}

export default Page