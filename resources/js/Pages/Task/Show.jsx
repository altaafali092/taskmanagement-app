import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

import { Head } from '@inertiajs/react'
import React from 'react'
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '../Constant'

const Show = ({ auth,task }) => {
    return (
        <AuthenticatedLayout user={auth.user} header={
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                {`task"${task.name}"`}
            </h2>
        }>
            <Head title='Task Detail' />
            {/* <pre>{JSON.stringify(task,2)}</pre> */}
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div>
                                <img src={task.image} className='w-full h-64 object-cover' alt="" />
                            </div>
                            <div className='grid gap-1 grid-cols-2 mt-2'>
                                <div>
                                    <div>
                                        <label className='font-bold text-lg'>task ID</label>
                                        <p className='mt-1'>{task.id}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className='font-bold text-lg'>Task Name</label>
                                        <p className='mt-1'>{task.name}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className='font-bold text-lg'>Task Status</label>
                                        <p className='mt-1'>
                                            <span className={'px-2 py-1 rounded text-white ' + TASK_STATUS_CLASS_MAP[task.status]}>
                                                {TASK_STATUS_TEXT_MAP[task.status]}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className='font-bold text-lg'>Project Status</label>
                                        <p className='mt-1'>{task.createdBy.name}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className='font-bold text-lg'>Due Date</label>
                                        <p className='mt-1'>{task.due_date}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className='font-bold text-lg'>Created Date</label>
                                        <p className='mt-1'>{task.created_at}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className='font-bold text-lg'>Updated By</label>
                                        <p className='mt-1'>{task.updatedBy.name}</p>
                                    </div>
                                </div>

                            </div>

                            <div className='mt-4'>
                                <label className='font-bold text-lg'>Project Description</label>
                                <p className='mt-1'>{task.description}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default Show
