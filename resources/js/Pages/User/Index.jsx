import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import React from 'react'
import { USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from '../Constant'
import { Button } from '@headlessui/react'
import Pagination from '@/Components/Pagination'

const notify = () => toast('Here is your toast.');


const Index = ({auth,users,queryParams = null}) => {

    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value

        } else {
            delete queryParams[name]
        }
        router.get(route('user.index'), queryParams)
    }
    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    }
    const deleteUser = (project) => {
        if(!window.confirm('Are You sure want to Delete ?'))
        {
            return;
        }
        router.delete(route('user.destroy',user))

    }

  return (
    <AuthenticatedLayout user={auth.user} header={
        <div className='flex justify-between items-center'>
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                user
            </h2>
            <Link href={route('user.create')} className='bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600'>
                Add New
            </Link>
        </div>
    }>

        <Head title='Users' />

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
                                        <th className='px-3 py-2'>Email </th>
                                        <th className='px-3 py-2'>CreatedAt</th>

                                        <th className='px-3 py-2'>Created By</th>
                                        <th className='px-3 py-2'>Action</th>
                                    </tr>
                                </thead>
                                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                                    <tr>
                                        <th className='px-3 py-2'></th>
                                        <th className='px-3 py-2'></th>
                                        <th className='px-3 py-2'>
                                            <TextInput className='w-full' placeholder='user name'
                                                defaultValue={queryParams.name}
                                                onBlur={e => searchFieldChanged('name', e.target.value)}
                                                onKeyPress={e => onKeyPress('name', e)}
                                            />
                                        </th>
                                        <th className='px-3 py-2'>
                                            <TextInput className='w-full' placeholder='user email'
                                                defaultValue={queryParams.email}
                                                onBlur={e => searchFieldChanged('email', e.target.value)}
                                                onKeyPress={e => onKeyPress('email', e)}
                                            />
                                        </th>

                                        <th className='px-3 py-2'> </th>
                                        <th className='px-3 py-2'> </th>
                                        <th className='px-3 py-2'></th>
                                        <th className='px-3 py-2'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map((user, idx) => (
                                        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-600' key={user.id}>
                                            <td className='px-3 py-2'>{user.id}</td>
                                            <td className='px-3 py-2'><img src={user.image} className='h-20 w-30' alt="user" /></td>
                                            <td className='px-3 py-2 hover:underline text-white'>
                                                <Link href={route('user.show', user)} >{user.name}</Link>
                                            </td>
                                            <td className='px-3 py-2'>{user.email}</td>
                                            <td className='px-3 py-2'>
                                                <span className={'px-2 py-1 rounded text-white ' + USER_STATUS_CLASS_MAP[user.status]}>
                                                    {USER_STATUS_TEXT_MAP[user.status]}
                                                </span>
                                            </td>
                                            <td className='px-3 py-2'>{user.created_at}</td>

                                            {/* <td className='px-3 py-2'>{user.createdBy.name}</td> */}
                                            <td className='px-3 py-2'>
                                                <Link href={route('user.edit', user)} className='font-medium text-blue-600 dark:text-blue-500 hover:underlin mx-1 rounded-lg'>Edit</Link>
                                                <Button onClick={(e)=>deleteUser(user)} className='font-medium text-red-600
                                                 dark:text-red-500 hover:underlin mx-1 bg-red-400 px-2 py-1
                                                  rounded-lg'>
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            <Pagination links={users.meta.links} />
                        </div>
                    </div>
                </div>
            </div>

    </AuthenticatedLayout>
  )
}

export default Index
