import { useCallback } from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import type { TypeColumn, TypeDataSource, TypeFilterValue, TypeRowProps, TypeSortInfo } from '@inovua/reactdatagrid-community/types'
import { useNavigate } from 'react-router-dom'

import PageTitle from '../../components/PageTitle/PageTitle'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { updateFilter } from '../../store/reducers/users'

import UsersService, { UserFilters } from '../../api/services/users'

import { formatDate } from '../../utils/date'

import '@inovua/reactdatagrid-community/index.css'

const columnDefs: TypeColumn[] = [
  { name: 'email', header: 'E-mail', minWidth: 180, flex: 1, },
  { name: 'name', header: 'Nome', minWidth: 150, flex: 1 },
  { name: 'surname', header: 'Sobrenome', minWidth: 170, flex: 1 },
  { name: 'cpf', header: 'Documento' },
  { name: 'birthDate', header: 'Data de Nascimento', minWidth: 160, flex: 1, render: ({ value }) => (formatDate(new Date(value))) },
  { name: 'gender', header: 'Gênero', render: ({ value }) => value === 'M' ? 'Masculino' : 'Feminino' },
  { name: 'createdAt', header: 'Data de cadastro', minWidth: 160, flex: 1, render: ({ value }) => (formatDate(new Date(value))) },
  { name: 'approved', header: 'Aprovado' }
];

const Users = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const { pagination, filters, sortInfo } = useAppSelector(({ users }) => users.queryOptions)

  function handleOnChangeGridFilters(filters: TypeFilterValue) {
    dispatch(updateFilter({ filters }))
  }

  function handleOnChangeGridSortInfo(sortInfo: TypeSortInfo) {
    dispatch(updateFilter({ sortInfo }))
  }

  function handleOnChangeGridSkip(skip: number) {
    dispatch(updateFilter({
      pagination: {
        ...pagination, skip: skip
      }
    }))
  }

  function handleOnChangeGridLimit(limit: number) {
    dispatch(updateFilter({
      pagination: {
        ...pagination, limit: limit
      }
    }))
  }

  function handleOnUserRowClick({ data }: TypeRowProps) {
    navigate(`./${data.id}`)
  }

  const loadData: TypeDataSource = async ({ skip, limit, sortInfo, filterValue = [] }) => {
    const queryParams: UserFilters = {
      page: skip / limit,
      perPage: limit
    }

    if (sortInfo) {
      queryParams.orderBy = sortInfo.name;
      queryParams.order = sortInfo.dir > 0 ? 'asc' : 'desc'
    }

    const activeFilters = filterValue.filter(({ value }: any) => !!value)
    const objectFilters = activeFilters.reduce((acc: any, { name, value }: any) => {
      return {
        ...acc,
        [name]: value
      }
    }, {} as Record<string, string>)

    const responseData = await UsersService.getAllUsers({ ...queryParams, ...objectFilters })

    return ({
      data: responseData.users,
      count: responseData.totalCount
    })
  }

  const dataSource = useCallback(loadData, []);

  return (
    <>
      <div className="flex justify-between">
        <PageTitle text="Usuários" />
      </div>
      <ReactDataGrid
        columns={columnDefs}
        pagination
        dataSource={dataSource}
        skip={pagination.skip}
        onSkipChange={handleOnChangeGridSkip}
        defaultLimit={pagination.limit}
        onLimitChange={handleOnChangeGridLimit}
        defaultFilterValue={filters}
        onFilterValueChange={handleOnChangeGridFilters}
        sortInfo={sortInfo}
        onSortInfoChange={handleOnChangeGridSortInfo}
        onRowClick={handleOnUserRowClick}
      />
    </>
  )
}

export default Users
