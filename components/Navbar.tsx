'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Disclosure, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const navigation = [
    { name: 'עמוד הבית', href: '/' },
    { name: 'כל הגיבורים', href: '/all-heroes' },
    { name: 'על האתר', href: '/about-us' },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function Navigation() {
    const pathname = usePathname();

    return (
        <Disclosure as="nav" className="bg-gradient-to-r from-lime-100 to-lime-100 shadow-md sticky top-0 z-50">
            {({ open, close }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-lime-600 hover:bg-lime-50 hover:text-lime-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lime-500 transition-all duration-300">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    <div className="flex items-center">
                                        {open ? (
                                            <>
                                                <XMarkIcon className="block h-6 w-6 mr-1 transition-transform duration-300 ease-in-out" aria-hidden="true" />
                                                <ChevronUpIcon className="h-4 w-4 transition-transform duration-300 ease-in-out" aria-hidden="true" />
                                            </>
                                        ) : (
                                            <>
                                                <Bars3Icon className="block h-6 w-6 mr-1 transition-transform duration-300 ease-in-out" aria-hidden="true" />
                                                <ChevronDownIcon className="h-4 w-4 animate-pulse transition-transform duration-300 ease-in-out" aria-hidden="true" />
                                            </>
                                        )}
                                    </div>
                                </Disclosure.Button>
                            </div>

                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex shrink-0 items-center">
                                    {/* <Link href="/">
                                        <img
                                            className="h-8 w-auto cursor-pointer hover:bg-lime-50 rounded-md transition-colors duration-200"
                                            src="/logo.png"
                                            alt="Memorial Site"
                                        />
                                    </Link> */}
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                aria-current={pathname === item.href ? 'page' : undefined}
                                                className={classNames(
                                                    pathname === item.href
                                                        ? 'bg-lime-600 text-white'
                                                        : 'text-lime-700 hover:bg-lime-50 hover:text-lime-800',
                                                    'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200'
                                                )}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <Link
                                    href="/contact-us"
                                    className="relative flex items-center rounded-md px-3 py-2 text-lime-600 hover:bg-lime-50 hover:text-lime-800 focus:outline-none focus:ring-2 focus:ring-lime-500 transition-colors duration-200"
                                >
                                    <span className="sr-only">Contact Us</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                    </svg>
                                    <span className="text-sm font-medium">צור קשר</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <Transition
                        show={open}
                        enter="transition ease-out duration-300"
                        enterFrom="transform -translate-y-2 opacity-0"
                        enterTo="transform translate-y-0 opacity-100"
                        leave="transition ease-in duration-200"
                        leaveFrom="transform translate-y-0 opacity-100"
                        leaveTo="transform -translate-y-2 opacity-0"
                    >
                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item, index) => (
                                    <Transition
                                        key={item.name}
                                        show={open}
                                        enter="transition-all ease-out"
                                        enterFrom="opacity-0 -translate-x-4"
                                        enterTo="opacity-100 translate-x-0"
                                        leave="transition-all ease-in"
                                        leaveFrom="opacity-100 translate-x-0"
                                        leaveTo="opacity-0 -translate-x-4"
                                        as="div"
                                        style={{ transitionDelay: `${index * 50}ms` }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => close()}
                                            aria-current={pathname === item.href ? 'page' : undefined}
                                            className={classNames(
                                                pathname === item.href
                                                    ? 'bg-lime-600 text-white'
                                                    : 'text-lime-700 hover:bg-lime-50 hover:text-lime-800',
                                                'block rounded-md px-3 py-2 text-base font-medium transition-all duration-300 ease-in-out border-b border-lime-200 last:border-0'
                                            )}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span>{item.name}</span>
                                                {pathname === item.href && (
                                                    <span className="bg-white bg-opacity-30 rounded-full p-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </span>
                                                )}
                                            </div>
                                        </Link>
                                    </Transition>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    );
}