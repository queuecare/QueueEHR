import React from 'react';
import MaterialTable from 'material-table';


export default function EditTable(props) {

  const [state, setState] = React.useState({
    columns: [
      { title: 'Date Given', field: 'date', type:'date' },
      { title: 'Vaccinated against', field: 'vaccinetype' },
      { title: 'Vaccine name', field: 'vaccinename' },
			{ title: 'Given by', field: 'nursename' },
    ],
  });


  return (
		<div>
    <MaterialTable
      title={props.title}
      columns={state.columns}
      data={props.data}
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
