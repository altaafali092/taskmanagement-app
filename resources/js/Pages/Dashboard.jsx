import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from './Constant';

export default function Dashboard({ auth, myPendingTasks, totalPendingTasks, totalProgressTasks, myProgressTasks, totalCompletedTasks, myCompletedTasks, activeTasks }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-amber-400 text-xl font-xl'>
                                Pending Tasks
                            </h3>
                            <p className='text-lg mt-4'>
                                <span className='mr-2'>{myPendingTasks}</span>/
                                <span className='ml-2'>{totalPendingTasks}</span>

                            </p>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-blue-500 text-xl font-xl'>
                              In  Progress Tasks
                            </h3>
                            <p className='text-lg mt-4'>
                                <span className='mr-2'>{myProgressTasks}</span>/
                                <span className='ml-2'>{totalProgressTasks}</span>

                            </p>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-green-500 text-xl font-xl'>
                                Completed Tasks
                            </h3>
                            <p className='text-lg mt-4'>
                                <span className='mr-2'>{myCompletedTasks}</span>/
                                <span className='ml-2'>{totalCompletedTasks}</span>

                            </p>
                        </div>
                    </div>
                </div>


                <div className='mx-auto max-w-7xl sm:px-6 lg:px-8 mt-4'>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className='text-xl font-mono mb-2'>
                                My Active Tasks
                            </h3>
                            <table>
                                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                                    <th className='px-3 py-2'>ID</th>
                                    <th className='px-3 py-2'>Project Name</th>
                                    <th className='px-3 py-2'>Name</th>
                                    <th className='px-3 py-2'>Status</th>
                                    <th className='px-3 py-2'>Due Date</th>
                                </thead>
                                <tbody>
                                    {activeTasks.data.map((task) =>(
                                        <tr>
                                            <td className='px-3 py-2'>{task.id}</td>
                                            <td className='px-3 py-2'>{task.project.name}</td>
                                            <td className='px-3 py-2'>{task.name}</td>
                                            <td className='px-3 py-2'>
                                                <span className={'px-2 py-1 rounded text-white ' + TASK_STATUS_CLASS_MAP[task.status]}>
                                                    {TASK_STATUS_TEXT_MAP[task.status]}

                                                </span>
                                            </td>
                                            <td className='px-3 py-2'>{task.due_date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
