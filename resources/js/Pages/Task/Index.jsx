import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '../Constant';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import { Toaster } from 'react-hot-toast';
import { Button } from '@headlessui/react';
import { toast, ToastContainer } from 'react-toastify';

const Index = ({ auth, tasks, queryParams = null,flash={} }) => {

    queryParams = queryParams || {}


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

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value

        } else {
           delete queryParams[name]
        }
        router.get(route('task.index'),queryParams)
    }
    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    }
    const deleteTask = (task) => {
        if(!window.confirm('Are You sure want to Delete ?'))
        {
            return;
        }
        router.delete(route('task.destroy',task))

    }

    return (
        <AuthenticatedLayout user={auth.user} header={
            <div className='flex justify-between items-center'>
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Task
                </h2>
                <Link href={route('task.create')} className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600'>
                    Add New
                </Link>
            </div>

        }>
            <Head title='Tasks' />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>

                            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                                    <tr>
                                        <th className='px-3 py-2'>ID</th>
                                        <th className='px-3 py-2'>Image</th>
                                        <th className='px-3 py-2'>Name </th>
                                        <th className='px-3 py-2'>Status</th>
                                        <th className='px-3 py-2'>CreatedAt</th>
                                        <th className='px-3 py-2'>Due Date </th>
                                        <th className='px-3 py-2'>Created By</th>
                                        <th className='px-3 py-2'>Action</th>
                                    </tr>
                                </thead>
                                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                                    <tr>
                                        <th className='px-3 py-2'></th>
                                        <th className='px-3 py-2'></th>
                                        <th className='px-3 py-2'>
                                            <TextInput className='w-full' placeholder='Task name'
                                            defaultValue={queryParams.name || ''}
                                                onBlur={e => searchFieldChanged('name', e.target.value)}
                                                onKeyPress={e => onKeyPress('name', e)}
                                            />
                                        </th>
                                        <th className='px-3 py-2'>
                                            <SelectInput className='w-full' defaultValue={queryParams.status || ''} onChange={e => searchFieldChanged('status', e.target.value)}>
                                                <option value="">select Status</option>
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </SelectInput>
                                        </th>
                                        <th className='px-3 py-2'> </th>
                                        <th className='px-3 py-2'> </th>
                                        <th className='px-3 py-2'></th>
                                        <th className='px-3 py-2'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.data.map((task, idx) => (
                                        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-600' key={task.id}>
                                            <td className='px-3 py-2'>{task.id}</td>
                                            <td className='px-3 py-2'><img src={task.image} className='h-20 w-30' alt="task" /></td>
                                            <td className='px-3 py-2 hover:underline'>
                                                <Link href={route('task.show',task)}>{task.name}</Link>
                                            </td>
                                            <td className='px-3 py-2'>
                                                <span className={'px-2 py-1 rounded text-white ' + TASK_STATUS_CLASS_MAP[task.status]}>
                                                    {TASK_STATUS_TEXT_MAP[task.status]}

                                                </span>
                                            </td>
                                            <td className='px-3 py-2'>{task.created_at}</td>
                                            <td className='px-3 py-2'>{task.due_date}</td>
                                            <td className='px-3 py-2'>{task.createdBy.name}</td>
                                            <td className='px-3 py-2 flex'>
                                                <Link href={route('task.edit', task)} className='font-medium text-blue-600 dark:text-blue-500 hover:underlin mx-1 rounded-lg'>Edit</Link>
                                                <Button onClick={(e) => deleteTask(task)} className='font-medium text-red-600
                                                 dark:text-red-500 hover:underlin mx-1 bg-red-400 px-2 py-1
                                                  rounded-lg'>
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            <Pagination links={tasks.meta.links} />
                        </div>
                    </div>
                </div>
                <ToastContainer position="bottom-right" />
            </div>

        </AuthenticatedLayout>
    );
};

export default Index;
