"use client"

import { signOut } from "next-auth/react";

export default function Navbar() {
    return (
        <ul className="navbar-nav nav flex-grow-1 pe-3 pt-4 ps-3">
            <a href="/user/home" style={{ color: 'white', textDecoration: 'none' }}> <li className="nav-item">    <i className="bi-house-door-fill"></i> Início</li></a>
            <a href="/user/reporting" style={{ color: 'white', textDecoration: 'none' }}><li className="nav-item mt-4">   <i className="bi-clipboard2-check"></i> Relatórios</li></a>
            <a href="/user/market" style={{ color: 'white', textDecoration: 'none' }}>  <li className="nav-item mt-4">    <i className="bi-shop-window"></i> Produtos para Divulgação</li></a>
            <a href="/user/creatives" style={{ color: 'white', textDecoration: 'none' }}> <li className="nav-item mt-4">   <i className="bi-basket"></i> Material de Divulgação</li></a>
            <a href="/user/invitation" style={{ color: 'white', textDecoration: 'none' }}>  <li className="nav-item mt-4">  <i className="bi-person-plus-fill"></i> Convide um Amigo</li></a>
            <a href="/user/vash/my-affiliates" style={{ color: 'white', textDecoration: 'none' }}> <li className="nav-item mt-4">  <i className="bi-people-fill"></i> Meus Afiliados</li></a>
            <a href="/user/trafego" style={{ color: 'white', textDecoration: 'none' }}> <li className="nav-item mt-4">   <i className="bi-wifi"></i> Tráfego</li></a>
            <a href="/user/wallet/" style={{ color: 'white', textDecoration: 'none' }}>  <li className="nav-item mt-4">     <i className="bi-cash-coin"></i> Carteira</li></a>
            <a href="/user/wallet/payments" style={{ color: 'white', textDecoration: 'none' }}>  <li className="nav-item mt-4">   <i className="bi-receipt"></i> Pagamentos</li></a>
            <a href="/user/wallet/withdraw" style={{ color: 'white', textDecoration: 'none' }}> <li className="nav-item mt-4">    <i className="bi-wallet"></i> Solicitar Saque</li></a>
            <a href="/user/account" style={{ color: 'white', textDecoration: 'none' }}> <li className="nav-item mt-4">    <i className="bi-person-gear"></i> Minha Conta</li></a>
            <li className="nav-item mt-4" style={{ color: 'white', textDecoration: 'none', cursor: 'pointer' }}>
                <button style={{ background: 'none', border: 'none', color: 'white', padding: 0 }} onClick={() => signOut()}>
                    <i className="bi-box-arrow-right"></i> Sair
                </button>
            </li>
        </ul>
    );
}