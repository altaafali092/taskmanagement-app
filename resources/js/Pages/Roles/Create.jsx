import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Create = ({ auth, permissions }) => {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        permission: [], 
    });

    const handlePermissionChange = (e) => {
        const { value, checked } = e.target;
        setData((prevData) => ({
            ...prevData,
            permission: checked
                ? [...prevData.permission, value]
                : prevData.permission.filter((id) => id !== value),
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('role.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Create Role
                    </h2>
                    <Link
                        href={route('role.index')}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        Roles List
                    </Link>
                </div>
            }
        >
            <Head title="Create Role" />

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

                                <div className="grid grid-cols-4 border border-gray-500 px-3 py-2 mt-3">
                                    {permissions.length > 0 &&
                                        permissions.map((permission, index) => (
                                            <div className="mt-3" key={index}>
                                                <input
                                                    type="checkbox"
                                                    id={`permission-${index}`}
                                                    value={permission.name}
                                                    onChange={handlePermissionChange}
                                                />
                                                <label
                                                    className="ms-2"
                                                    htmlFor={`permission-${index}`}
                                                >
                                                    {permission.name}
                                                </label>
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

export default Create;
