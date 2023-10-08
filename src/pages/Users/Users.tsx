import { useCallback } from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import SelectFilter from '@inovua/reactdatagrid-community/SelectFilter'
import type {
  TypeColumn,
  TypeDataSource,
  TypeFilterValue,
  TypeRowProps,
  TypeSortInfo,
} from '@inovua/reactdatagrid-community/types'
import { useNavigate } from 'react-router-dom'

import PageTitle from '../../components/PageTitle/PageTitle'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { updateFilter } from '../../store/reducers/users'

import UsersService, { UserFilters } from '../../api/services/users'

import { formatDate } from '../../utils/date'

import '@inovua/reactdatagrid-community/index.css'
import ApprovedIcon from '../../components/ApprovedIcon/ApprovedIcon'

type CustomTypeColumn = TypeColumn & {
  enableColumnFilterContextMenu?: boolean
}

const columnDefs: CustomTypeColumn[] = [
  { name: 'email', header: 'E-mail', minWidth: 180, flex: 1 },
  { name: 'name', header: 'Nome', minWidth: 150, flex: 1 },
  { name: 'surname', header: 'Sobrenome', minWidth: 170, flex: 1 },
  { name: 'cpf', header: 'Documento' },
  {
    name: 'birthDate',
    header: 'Data de Nascimento',
    minWidth: 160,
    flex: 1,
    render: ({ value }) => formatDate(new Date(value)),
  },
  {
    name: 'gender',
    header: 'Gênero',
    filterEditor: SelectFilter,
    filterEditorProps: {
      dataSource: [
        {
          id: 'M',
          label: 'Masculino',
        },
        {
          id: 'F',
          label: 'Feminino',
        },
      ],
    },
    render: ({ value }) => (value === 'M' ? 'Masculino' : 'Feminino'),
  },
  {
    name: 'createdAt',
    header: 'Data de cadastro',
    minWidth: 160,
    flex: 1,
    render: ({ value }) => formatDate(new Date(value)),
  },
  {
    name: 'status',
    header: 'Aprovado',
    render: ({ value }) => <ApprovedIcon status={value} />,
  },
]

const formatedColumnDefs: CustomTypeColumn[] = columnDefs.map((item) => {
  return {
    ...item,
    enableColumnFilterContextMenu: false,
  }
})

const Users = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pagination, filters, sortInfo } = useAppSelector(
    ({ users }) => users.queryOptions,
  )

  function handleOnChangeGridFilters(filters: TypeFilterValue) {
    dispatch(updateFilter({ filters }))
  }

  function handleOnChangeGridSortInfo(sortInfo: TypeSortInfo) {
    dispatch(updateFilter({ sortInfo }))
  }

  function handleOnChangeGridSkip(skip: number) {
    dispatch(
      updateFilter({
        pagination: {
          ...pagination,
          skip: skip,
        },
      }),
    )
  }

  function handleOnChangeGridLimit(limit: number) {
    dispatch(
      updateFilter({
        pagination: {
          ...pagination,
          limit: limit,
        },
      }),
    )
  }

  function handleOnUserRowClick({ data }: TypeRowProps) {
    navigate(`./${data.id}`)
  }

  const loadData: TypeDataSource = async ({
    skip,
    limit,
    sortInfo,
    filterValue = [],
  }) => {
    const queryParams: UserFilters = {
      page: skip / limit,
      perPage: limit,
    }

    if (sortInfo) {
      queryParams.orderBy = sortInfo.name
      queryParams.order = sortInfo.dir > 0 ? 'asc' : 'desc'
    }

    const activeFilters = filterValue.filter(({ value }: any) => !!value)
    const objectFilters = activeFilters.reduce(
      (acc: any, { name, value }: any) => {
        return {
          ...acc,
          [name]: value,
        }
      },
      {} as Record<string, string>,
    )

    const responseData = await UsersService.getAllUsers({
      ...queryParams,
      ...objectFilters,
    })

    console.log({ responseData })

    return {
      data: responseData.users,
      count: responseData.totalCount,
    }
  }

  const dataSource = useCallback(loadData, [])

  return (
    <>
      <div className="flex justify-between">
        <PageTitle text="Usuários" />
      </div>
      <ReactDataGrid
        columns={formatedColumnDefs}
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
        showColumnMenuFilterOptions={false}
        showColumnMenuSortOptions={false}
        showColumnMenuGroupOptions={false}
        showColumnMenuLockOptions={false}
        showColumnMenuTool={false}
      />
    </>
  )
}

export default Users
