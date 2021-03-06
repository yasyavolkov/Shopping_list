import styles from './MainLayout.module.scss';
import Head from "next/head";
import Link from 'next/link';
import { useRouter } from "next/router";
import React, { FC, useContext } from "react";
import { Context, Home } from "components";
import { ContextType } from "types/contextTypes";
import cn from 'classnames'

interface MainLayoutProps {
   title: string;
}

export const MainLayout: FC<MainLayoutProps> =
   ({
       title,
       children
    }) => {
      const { pathname } = useRouter();
      const { state } = useContext<ContextType>(Context);

      return (
         <>
            <Head>
               <title>Shopping list | {title}</title>
               <link rel="preconnect" href="https://fonts.googleapis.com" />
               <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'true'} />
               <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
            </Head>
            <header className={styles.header}>
               <nav>
                  <div className={styles.homeWrapper}>

                     <Link href={'/'}>
                        <a
                           className={pathname === "/" ? styles.selected : ""}>
                           <Home className={cn(styles.icon, { [styles.selected]: pathname === '/' })} />
                        </a>
                     </Link>
                  </div>

                  <Link href={'/shoppingList'}><a
                     className={pathname === "/shoppingList" ? styles.selected : ""}>Shopping list</a></Link>
                  <Link href={'/editDataBase'}><a
                     className={pathname === "/editDataBase" ? styles.selected : ""}>Edit database</a></Link>
               </nav>
            </header>
            <main className={styles.main}>
               {children}
            </main>
         </>
      );
   };
