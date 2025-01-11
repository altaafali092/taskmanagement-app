import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Create = ({ auth, projects,users }) => {

    const { data, setData, post, errors, processing } = useForm({
        image: '',
        name: '',
        description: '',
        due_date: '',
        priority: '',
        project_id: '',
        status: '',
        assigned_user_id: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('task.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Create Task
                    </h2>
                    <Link
                        href={route('task.index')}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        Tasks List
                    </Link>
                </div>
            }
        >
            <Head title="Create Task" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                                {/* Task Image */}
                                <div>
                                    <InputLabel htmlFor="task_image" value="Task Image" />
                                    <TextInput
                                        id="task_image"
                                        type="file"
                                        name="image"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />
                                    <InputError message={errors.image} className="mt-2" />
                                </div>

                                {/* Task Name */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_name" value="Task Name" />
                                    <TextInput
                                        id="task_name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                {/* Project Selection */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="project_id" value="Project" />
                                    <SelectInput
                                        id="project_id"
                                        name="project_id"
                                        className="mt-1 block w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:text-gray-100"
                                        value={data.project_id}
                                        onChange={(e) => setData('project_id', e.target.value)}
                                    >
                                        <option value="">Select a Project</option>
                                        {projects.map((project) => (
                                            <option key={project.id} value={project.id}>
                                                {project.name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    <InputError message={errors.project_id} className="mt-2" />
                                </div>

                                {/* Task Description */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_description" value="Task Description" />
                                    <TextAreaInput
                                        id="task_description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                {/* Task Due Date */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_due_date" value="Task Due Date" />
                                    <TextInput
                                        id="task_due_date"
                                        type="date"
                                        name="due_date"
                                        value={data.due_date}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('due_date', e.target.value)}
                                    />
                                    <InputError message={errors.due_date} className="mt-2" />
                                </div>


                                <div className="mt-4">
                                    <InputLabel htmlFor="project_id" value="Assigned User" />
                                    <SelectInput
                                        id="assigned_user_id"
                                        name="assigned_user_id"
                                        className="mt-1 block w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:text-gray-100"
                                        value={data.assigned_user_id}
                                        onChange={(e) => setData('assigned_user_id', e.target.value)}
                                    >
                                        <option value="" disabled>Select a user</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    <InputError message={errors.assigned_user_id} className="mt-2" />
                                </div>

                                {/* Task Status */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_status" value="Task Status" />
                                    <SelectInput
                                        id="task_status"
                                        name="status"
                                        className="w-full"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>
                                    <InputError message={errors.status} className="mt-2" />
                                </div>

                                {/* Task Priority */}
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_priority" value="Task Priority" />
                                    <SelectInput
                                        id="task_priority"
                                        name="priority"
                                        className="w-full"
                                        value={data.priority}
                                        onChange={(e) => setData('priority', e.target.value)}
                                    >
                                        <option value="">Select Priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </SelectInput>
                                    <InputError message={errors.priority} className="mt-2" />
                                </div>

                                {/* Submit and Cancel Buttons */}
                                <div className="mt-4 text-right">
                                    <Link
                                        href={route('task.index')}
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
