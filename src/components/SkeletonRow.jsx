import React from 'react'
import { Skeleton } from "@mui/material";


export default function SkeletonRow({ height }) {
    return (
        <tr>
            <td>
                <Skeleton variant="rectangular" height={height} />
            </td>
            <td>
                <Skeleton variant="rectangular" height={height} />
            </td>
            <td>
                <Skeleton variant="rectangular" height={height} />
            </td>
        </tr>
    )
}
