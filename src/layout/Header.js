import React from 'react'
import { useSelector } from 'react-redux';

export default function Header() {
    const isAuthenticated = useSelector((state) => state.Auth.isAuthenticated);
    
    return (
        <div>Header</div>
    )
}
