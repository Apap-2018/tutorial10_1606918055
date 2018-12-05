import React from 'react';

export const StaffFarmasiRow = (props) => {
    return (
        <tbody>
            {props.listStaffFarmasi.map(staff => {
                return (
                    <tr key={staff.id}>
                        <td>{staff.nama}</td>
                    </tr>
                )
            })}
        </tbody>
    )
}