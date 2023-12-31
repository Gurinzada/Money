import { Title } from "../Titles/Titles";
import TransactionCard from "../Cards/TransactionCard";

//STYLES
import { BsTrash } from "react-icons/bs";
import styles from "../../styles/transactionComponents/DeleteTransactionForm.module.scss"

//UTILS
import { useState } from "react";
import { DateTime } from "luxon";
import { useTransactionDelete, useTransactionsGet } from "../../queries/transaction";
import { queryClient } from "../../constants/config";

const DeleteTransactionForm = () => {
    const [firstDate, setFirstDate] = useState(
        DateTime.now().minus({day: 1, }).toISODate()
        //DateTime.now().toISODate()
    );

    const [lastDate, setLastDate] = useState(
        DateTime.now().plus({ day: 1 }).toISODate()
        //DateTime.now().toISODate()
    );

    const { mutate: deleteTr } = useTransactionDelete();

    const { data, refetch: fetchTransactions, isLoading: transactionsLoading, } = useTransactionsGet({
        firstDate: firstDate, 
        lastDate: lastDate, 
        key: "Trs",
    });
    
    return (
        <div className={styles.container} data-cy="containerDelete">
            <Title>Apagar Transações</Title>
            <div className={styles.dateSearchFilter}>
                {/* FIRST DATE */}
                <div className={styles.date}>
                    <label htmlFor="firstDate">De: </label>
                    <input
                        type="date"
                        name="firstDate"
                        value={firstDate}
                        onChange={(e) => setFirstDate(e.target.value)} 
                    />
                </div>
                {/* LAST DATE */}
                <div className={styles.date}>
                    <label htmlFor="lastDate">Até: </label>
                    <input 
                        type="date"
                        name="lastDate"
                        value={lastDate}
                        onChange={(e) => setLastDate(e.target.value)} 
                    />
                </div>
                {/* ACTION BUTTON */}
                <button className={styles.btn} onClick={() => fetchTransactions()}
                data-cy="exibirTransacao"
                >
                    Exibir Transações
                </button>
            </div>

            {/* RESULTS */}
            <div className={styles.results}>
                {data && 
                    data?.data.map((tr, index) => {
                        return (
                            <div key={index} className={styles.container}>
                                <div className={styles.deleteContainer}>
                                    <TransactionCard 
                                        category={tr.category.name}
                                        money={tr.money}
                                        description={`id: ${tr.id}title: ${tr.title} ${tr.info}`}
                                        date={DateTime.fromISO(tr.date).toISODate()}
                                        title={tr.title}
                                    />
                                    <div data-cy = "deleteButao"
                                        className={styles.iconContainer}
                                        style={
                                            transactionsLoading
                                                ? {
                                                    pointerEvents: "none",
                                                    background: "#333",
                                                }
                                                : {}
                                        }
                                        onClick={() => {
                                            deleteTr(tr.id, {
                                                onSuccess: async () => {
                                                    await queryClient
                                                        .invalidateQueries("Trs")
                                                        .then(await fetchTransactions())
                                                        .catch();
                                                },
                                            });
                                        }}
                                    >
                                        <BsTrash />
                                    </div> 
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default DeleteTransactionForm;