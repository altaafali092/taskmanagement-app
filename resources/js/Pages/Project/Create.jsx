import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import SelectInput from '@/Components/SelectInput'
import TextAreaInput from '@/Components/TextAreaInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

import { Head, Link, useForm } from '@inertiajs/react'

import React from 'react'

const Create = ({ auth, project }) => {
    const { data, setData, post, progress, errors, reset } = useForm({
        image : '',
        name: '',
        status: '',
        description: '',
        due_date: '',
    })
    const onSubmit = (e) => {
        e.preventDefault();
        post(route('project.store'))
    }
    return (
        <AuthenticatedLayout user={auth.user} header={
            <div className='flex justify-between items-center'>
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Create New Project
                </h2>
                <Link href={route('project.create')} className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600'>
                    Add New
                </Link>
            </div>
        }>
            <Head title='Projects' />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={onSubmit} className='p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'>
                                <div>
                                    <InputLabel
                                        htmlFor='project_image'
                                        value='project Image'
                                    />
                                    <TextInput
                                        id='project_image'
                                        type='file'
                                        name='image'
                                        // value={data.image_path}
                                        className='mt-1 block w-full'
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />
                                    <InputError message={errors.image_path} className='mt-2' />
                                </div>
                                <div className='mt-4'>
                                    <InputLabel htmlFor='Project_name' value='Project Name' />
                                    <TextInput
                                        id='project_name'
                                        type='text'
                                        name='name'
                                        value={data.name}
                                        className='mt-1 block w-full'
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} className='mt-2' />

                                </div>
                                <div className='mt-4'>
                                    <InputLabel htmlFor='Project_description' value='Project Description' />
                                    <TextAreaInput
                                        id='project_description'
                                        type='text'
                                        name='description'
                                        value={data.description}
                                        className='mt-1 block w-full'
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors.description} className='mt-2' />

                                </div>

                                <div className='mt-4'>
                                    <InputLabel htmlFor='Project_due_date' value='Project Due Date' />
                                    <TextInput
                                        id='project_due_date'
                                        type='date'
                                        name='due_date'
                                        value={data.due_date}
                                        className='mt-1 block w-full'
                                        onChange={(e) => setData('due_date', e.target.value)}
                                    />
                                    <InputError message={errors.due_date} className='mt-2' />

                                </div>
                                <div className='mt-4'>
                                    <InputLabel htmlFor='project_status' value='Project Status' />
                                    <SelectInput
                                        id='project_status'
                                        name='status'
                                        className='w-full'
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                    >
                                        <option value="">select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>
                                    <InputError message={errors.due_date} className='mt-2' />
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
