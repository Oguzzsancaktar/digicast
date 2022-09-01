import React from 'react'
import { useGetRegistersQuery } from '../../services/registerService'
import DataTable from 'react-data-table-component'
import cityOptions from '../../constants/cities'
import moment from 'moment'

const RegisterListPage = () => {
  const { data: registerListData } = useGetRegistersQuery()

  const columns = [
    {
      name: 'Ad Soyad',
      selector: row => row.fullname,
      sortable: true
    },
    {
      name: 'Telefon',
      width: '200px',
      selector: row => row.phone
    },

    {
      name: 'E-posta',
      selector: row => row.email
    },
    {
      name: 'Şehir',
      width: '200px',
      selector: row => cityOptions.find(city => city.value === row.city)?.label || '',
      sortable: true
    },
    {
      name: 'Doğum Tarihi',
      width: '200px',
      selector: row => moment.unix(row.birthday / 1000).format('DD/MMMM/YYYY'),
      sortable: true
    }
  ]

  return <DataTable fixedHeader columns={columns} data={registerListData || []} />
}

export default RegisterListPage
