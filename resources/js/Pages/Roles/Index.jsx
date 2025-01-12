import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import React, { useEffect } from 'react';

import { Button } from '@headlessui/react';
import { toast, ToastContainer } from 'react-toastify';

const Index = ({ auth, roles, flash = {} }) => {
    useEffect(() => {
        if (flash.toast && !flash.toast._handled) {
            const { type, message } = flash.toast;
            if (type === 'success') {
                toast.success(message);
            } else if (type === 'error') {
                toast.error(message);
            } else {
                toast(message);
            }
            flash.toast._handled = true;
        }
    }, [flash]);
    const deleteTask = (role) => {
        if (!window.confirm('Are You sure want to Delete ?')) {
            return;
        }
        router.delete(route('role.destroy', role))

    }

    return (
        <AuthenticatedLayout user={auth.user} header={
            <div className='flex justify-between items-center'>
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Roles
                </h2>
                <Link href={route('role.create')} className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600'>
                    Add New
                </Link>
            </div>

        }>
            <Head title='Roles' />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>

                                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                                    <tr>
                                        <th className='px-3 py-2'>ID</th>
                                        <th className='px-3 py-2'>Role Name</th>
                                        <th className='px-3 py-2'>Permissions </th>
                                        <th className='px-3 py-2'>Created_At</th>
                                        <th className='px-3 py-2'>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {roles.data.map((role, idx) => (
                                        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-600' key={role.id}>
                                            <td className='px-3 py-2'>{role.id}</td>
                                            <td className='px-3 py-2'>{role.name}</td>
                                            <td className='px-3 py-2'>
                                                {role.permissions.map((permission) => (
                                                    <span key={permission.id} className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-1 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-900">
                                                        {permission.name}
                                                    </span>
                                                ))}
                                            </td>

                                            <td className='px-3 py-2'>{role.created_at}</td>
                                            <td className='px-3 py-2 flex'>
                                                <Link href={route('role.edit', role)} className='font-medium bg-slate-50 px-2 py-0.5 text-blue-600 dark:text-blue-500 hover:underlin mx-1 rounded-lg'>Edit</Link>
                                                <Button onClick={(e) => deleteTask(role)} className='font-medium text-red-600
                                                 dark:text-white hover:underlin mx-1 bg-red-400 px-2 py-0.5
                                                  rounded-lg'>
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            {/* <Pagination links={roles.meta.links} /> */}
                        </div>
                    </div>
                </div>
                <ToastContainer position="bottom-right" />
            </div>

        </AuthenticatedLayout>
    );
};

export default Index;
