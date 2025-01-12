import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Edit = ({ auth, permissions, role, hasPermissions }) => {
    const { data, setData, post, errors, processing } = useForm({
        name: role.name || '',
        permission: hasPermissions || [],  // Use permission IDs directly
        _method: 'PUT',
    });


    const handlePermissionChange = (e) => {
        const { value, checked } = e.target;
        // Make sure permission value is being handled as a string (ID)
        setData((prevData) => ({
            ...prevData,
            permission: checked
                ? [...prevData.permission, value]  // Add permission ID if checked
                : prevData.permission.filter((name) => name !== value),  // Remove permission ID if unchecked
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('role.update', role.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Edit Role
                    </h2>
                    <Link
                        href={route('role.index')}
                        className="bg-emerald-500 py-1 px-3 flex gap-1 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        Roles List
                    </Link>
                </div>
            }
        >
            <Head title="Edit Role" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form
                                onSubmit={onSubmit}
                                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                            >
                                <div className="mt-4">
                                    <InputLabel htmlFor="role_name" value="Role Name" />
                                    <TextInput
                                        id="role_name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="grid grid-cols-4 mb-3 border mt-3 border-gray-500 px-3 pb-2">
                                    {permissions.length > 0 &&
                                        permissions.map((permission) => (
                                            <div className="mt-3 " key={permission.id}>
                                                <input
                                                    type="checkbox"
                                                    id={`permission-${permission.id}`}
                                                    name="permission[]"
                                                    value={permission.name} // Use permission ID as value
                                                    checked={data.permission.includes(permission.name)} // Check if the ID is included in the array
                                                    onChange={handlePermissionChange}
                                                    className="rounded"
                                                />
                                                <label className='m-2' htmlFor={`permission-${permission.id}`}>{permission.name}</label>
                                            </div>
                                        ))}
                                </div>



                                <div className="mt-4 text-right">
                                    <Link
                                        href={route('role.index')}
                                        className="bg-gray-100 py-1 px-3 text-gray-700 rounded shadow transition-all hover:bg-gray-200 mr-2"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
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
    );
};

export default Edit;
