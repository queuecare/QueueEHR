import React from 'react';
import MaterialTable from 'material-table';


export default function EditTable(props) {
  const styles=`fontSize:'1em'`;
  const [state, setState] = React.useState({
    columns: [
      { title: 'Date Given', field: 'date', type:'date', style:{styles} },
      { title: 'Vaccinated against', field: 'vaccinetype' },
      { title: 'Vaccine name', field: 'vaccinename' },
			{ title: 'Given by', field: 'nursename' },
    ],
  });


  return (
		<div>
    <MaterialTable
      className={props.className}
      title={props.title}
      columns={state.columns}
      data={props.data}
      options={{
        actionsColumnIndex: -1,
        headerStyle: { fontSize:'1em'},
        rowStyle: { fontSize:'1em'},
        showTitle: false
      }}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.unshift(newData);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          }),
      }}
    />
		</div>
  );
}
