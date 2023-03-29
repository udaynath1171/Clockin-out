import React, { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  IconButton,
  Chip
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Moment from 'react-moment'
import HomeModal from '../HomeModal'
import { ConfirmDialog } from '../../../../components'
import { makeStyles } from '@material-ui/core/styles'
import MUIDataTable from "mui-datatables";

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
})

const HomeTable = (props) => {
  const { records } = props
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const [event, setEvent] = useState()
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [confirmRemoveAction, setConfirmRemoveAction] = useState(false)
  const [idRecord, setIdRecord] = useState()
  const [tableConfig, setTableConfig] = useState({rowsPerPage: 10})

  const handleOpenModal = (id, type, date) => {
    setEvent({
      id: id,
      register_type: type,
      register_date: date,
    })
    setOpen(true);
  }

  const handleOpenConfirmDialog = (id) => {
    setIdRecord(id)
    setOpenConfirmDialog(true)
  }

  useEffect(() => {
    if (idRecord ) {
      props.removeAction(idRecord)
      setIdRecord()
      setConfirmRemoveAction(false)
    }
  }, [confirmRemoveAction])

  const columns = [
    { name: 'id',
      label: 'ID',
      options: {
        filter: false,
        sort: false
      }
    },
    { name: 'attributes.register_type',
      label: 'Type',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Chip label={value} variant="outlined" />
        )
      }
    },
    { name: 'attributes.register_date',
      label: 'Date',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Moment format="MM/DD/YYYY HH:MM:SS">{value}</Moment>
        )
      }
    },
    { name: 'attributes.created_at',
      label: 'Created in',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Moment format="MM/DD/YYYY HH:MM:SS">{value}</Moment>
        )
      }
    },
    { name: '',
      label: 'Edit',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton >
              <EditIcon onClick={() => { handleOpenModal(tableMeta.rowData[0], tableMeta.rowData[1], tableMeta.rowData[2]) }}/>
            </IconButton>
          )
        }
      }
    },
    { name: '',
      label: 'Delete',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <IconButton >
              <DeleteIcon onClick={() => { handleOpenConfirmDialog(tableMeta.rowData[0]) }} />
            </IconButton>
          )
        }
      }
    }
  ];

  const tableUpdate = (page, rowsPerPage) => {
    props.listAction(`?page=${page}&items=${rowsPerPage}`)
  }

  useEffect(() => {
    if (records.length > 0) {
      setTableConfig({
        page: props.meta.page,
        count: props.meta.count,
        rowsPerPage: props.meta.items
      });
    }
  }, [records])

  const options = {
    selectableRows: 'none',
    filter: false,
    search: false,
    responsive: 'scrollFullHeight',
    serverSide: true,
    count: tableConfig.count,
    page: tableConfig.page,
    rowsPerPage: tableConfig.rowsPerPage,
    onTableChange: (action, tableState) => {
      switch (action) {
        case 'changePage':
        case 'changeRowsPerPage':
          tableUpdate(tableState.page + 1, tableState.rowsPerPage);
          break;

      }
    }
  };

  return (
    <Card>
      <CardContent>
        <PerfectScrollbar>
          {
            records ?
              <MUIDataTable
                title={"ClockIn/Out list"}
                data={records}
                columns={columns}
                options={options}
            /> :
            <></>
          }
        </PerfectScrollbar>
        <HomeModal
          open={open}
          setOpen={setOpen}
          event={event}
          updateAction={props.updateAction}
        />
        <ConfirmDialog
          openConfirmDialog={openConfirmDialog}
          setOpenConfirmDialog={setOpenConfirmDialog}
          setConfirmRemoveAction={setConfirmRemoveAction}
          title={'Delete record'}
          description={'You are about to delete this record, are you sure?'}
        />
      </CardContent>
    </Card>
  )
}

export default HomeTable
