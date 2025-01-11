import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

import { Head, Link, useForm } from '@inertiajs/react'

import React from 'react'

const Edit = ({ auth, user }) => {
    const { data, setData, post, progress, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: '',
        _method:'PUT',
    })

    const onSubmit = (e) => {
        e.preventDefault()
        post(route('user.update', user.id))

    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Update User
                    </h2>
                    <Link
                        href={route('user.index')}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        User List
                    </Link>
                </div>
            }
        >
            <Head title="Edit User" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form
                                onSubmit={onSubmit}
                                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                            >

                                <div className="mt-4">
                                    <InputLabel htmlFor="user_name" value="User Name" />
                                    <TextInput
                                        id="user_name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>


                                <div className="mt-4">
                                    <InputLabel htmlFor="user_email" value="User Email" />
                                    <TextInput
                                        id="user_email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                {/* Password Input */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="user_password" value="Password (Optional)" />
                                    <TextInput
                                        id="user_password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Leave blank to keep current password"
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                {/* Confirm Password Input */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="user_password_confirmation" value="Confirm Password" />
                                    <TextInput
                                        id="user_password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-4 text-right">
                                    <Link
                                        href={route('user.index')}
                                        className="bg-gray-100 py-1 px-3 text-gray-700 rounded shadow transition-all hover:bg-gray-200 mr-2"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Edit
