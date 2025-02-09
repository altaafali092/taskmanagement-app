import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import SelectInput from '@/Components/SelectInput'
import TextAreaInput from '@/Components/TextAreaInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

import { Head, Link, useForm } from '@inertiajs/react'

import React from 'react'

const Create = ({ auth, roles }) => {
    console.log(roles)
    const { data, setData, post, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role:[]
    })

    const handleRoleChange = (e) => {
        const { value, checked } = e.target;
        setData((prevData) => ({
            ...prevData,
            role: checked
                ? [...prevData.role, value]
                : prevData.role.filter((id) => id !== value),
        }));
    };
    const onSubmit = (e) => {
        e.preventDefault();
        post(route('user.store'))
    }
    return (
        <AuthenticatedLayout user={auth.user} header={
            <div className='flex justify-between items-center'>
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Create New User
                </h2>
                <Link href={route('user.index')} className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600'>
                    User List
                </Link>
            </div>
        }>
            <Head title='Users' />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={onSubmit} className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'>

                                <div className='grid grid-cols-2 gap-2'>
                                    <div className='mt-4 px-4'>
                                        <InputLabel htmlFor='user_name' value='User Name' />
                                        <TextInput
                                            id='user_name'
                                            type='text'
                                            name='name'
                                            value={data.name}
                                            className='mt-1 block w-full'
                                            onChange={(e) => setData('name', e.target.value)}
                                        />
                                        <InputError message={errors.name} className='mt-2' />
                                    </div>
                                    <div className='mt-4 px-4'>
                                        <InputLabel htmlFor='user_name' value='User Email' />
                                        <TextInput
                                            id='project_email'
                                            type='email'
                                            name='email'
                                            value={data.email}
                                            className='mt-1 block w-full'
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        <InputError message={errors.email} className='mt-2' />
                                    </div>
                                    <div className='mt-4 px-4'>
                                        <InputLabel htmlFor='user_password' value='User password' />
                                        <TextInput
                                            id='project_password'
                                            type='password'
                                            name='password'
                                            value={data.password}
                                            className='mt-1 block w-full'
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <InputError message={errors.password} className='mt-2' />
                                    </div>
                                    <div className='mt-4 px-4'>
                                        <InputLabel htmlFor='user_password_confirmation' value='User password_confirmation' />
                                        <TextInput
                                            id='project_password_confirmation'
                                            type='password'
                                            name='password_confirmation'
                                            value={data.password_confirmation}
                                            className='mt-1 block w-full'
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                        />
                                        <InputError message={errors.password_confirmation} className='mt-2' />
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 border border-gray-500 px-3 pb-3 m-3">
                                    {roles.length > 0 &&
                                        roles.map((role, index) => (
                                            <div className="mt-3" key={index}>
                                                <input
                                                    type="checkbox"
                                                    id={`role-${index}`}
                                                    value={role.name}
                                                    onChange={handleRoleChange}
                                                />
                                                <label
                                                    className="ms-2"
                                                    htmlFor={`role-${index}`}
                                                >
                                                    {role.name}
                                                </label>
                                            </div>
                                        ))}
                                </div>

                                <div className='mt-4 text-right'>
                                    <Link className='bg-gray-100 py-1 px-3 text-gray-700 rounded
                                     shadow transition-all hover:bg-gray-200 mr-2'>
                                        Cancel
                                    </Link>
                                    <button className='bg-emerald-500 py-1 px-3 text-white rounded
                                    shadow transition-all hover:bg-emerald-600'>
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

export default Create
