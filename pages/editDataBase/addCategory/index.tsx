import { MainLayout } from "components";
import styles from './addCategory.module.scss';
import Link from 'next/link';
import { FC, FormEvent, useState } from "react";
import { addNewCategory } from "axiosApi";
import { useRouter } from "next/router";
import { CategoryForm } from "types/axiosApiTypes";

const AddCategory: FC = () => {
   const router = useRouter();
   const [newCategory, setNewCategory] = useState<CategoryForm>({
      category: "",
      subCategories: []
   });

   const [newSubCategory, setNewSubCategory] = useState('');

   const addSubCategory = (): void => {
      if (newSubCategory.length === 0) {
         return;
      }
      setNewCategory((prev) => {
         return { ...prev, subCategories: [...newCategory.subCategories, newSubCategory] };
      });
      setNewSubCategory('');
   };

   const deleteSubCategory = (index: number | string): void => {
      setNewCategory((prev) => {
         return { ...prev, subCategories: prev.subCategories.filter((el, ind) => ind !== index) };
      });
   };

   const cleanupSubCategories = (): void => {
      setNewCategory((prev) => {
         return { ...prev, subCategories: [] };
      });
   };

   const submit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (newCategory.category.length === 0) {
         return;
      }
      await addNewCategory(newCategory);
      await router.push('/editDataBase');
   };

   return (
      <MainLayout title="Add category">
         <div className={'container'}>
            <section className={'addCategory'}>
               <div className={'formWrapper'}>
                  <div className={'formHeader'}>
                     <h3>You can add a new category to database</h3>
                     <p>Please, input name and add possible subcategories in new category</p>
                  </div>
                  <form className={'form'} onSubmit={submit}>
                     <div className={'inputWrapper'}>
                        <span className={'inputLabel'}>Name</span>
                        <input className={'inputText'} type={'text'}
                               onChange={e => setNewCategory({ ...newCategory, category: e.target.value })} />
                     </div>
                     <div className={'inputWrapper'}>
                        <span className={'inputLabel'}>Subcategories</span>
                        <input className={'inputText'} type={'text'}
                               onChange={e => setNewSubCategory(e.target.value)} value={newSubCategory} />
                        <div className={styles.addSubCategoryActions}>
                           <button className={styles.addSubCategoryBtn} onClick={(e) => {
                              e.preventDefault()
                              addSubCategory()
                           }}>Add
                           </button>
                           <button className={styles.deleteSubCategoryBtn}
                                   onClick={cleanupSubCategories}>
                              Clear
                           </button>
                        </div>
                        <div className={styles.inputResult}>
                           <ul>
                              {newCategory.subCategories.map((el, index) => <li key={index}>
                                 {el}
                                 <div className={styles.deleteBtn} onClick={() => deleteSubCategory(index)} />
                              </li>)}
                           </ul>
                        </div>
                     </div>
                     <div className={'formActions'}>
                        <button type={'submit'}>Submit</button>
                        <Link href={'/editDataBase'}>
                           <a>
                              <button>Back</button>
                           </a>
                        </Link>
                     </div>
                  </form>
               </div>
            </section>
         </div>
      </MainLayout>
   )
      ;
};

export default AddCategory;