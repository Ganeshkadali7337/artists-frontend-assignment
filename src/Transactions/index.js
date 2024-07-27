import { Component } from "react";

import { TailSpin } from "react-loader-spinner";

import "./index.css";
import axios from "axios";

class Transactions extends Component {
  state = { isLoading: false, transactions: [] };
  getData = async () => {
    await axios
      .get(
        "https://artists-backend-assignment-production.up.railway.app/transactions"
      )
      .then((res) =>
        this.setState({ transactions: res.data.transactions, isLoading: false })
      )
      .catch((err) => {
        alert(err);
        this.setState({ isLoading: false });
      });
  };

  componentDidMount() {
    this.setState({ isLoading: true }, this.getData);
  }

  onClickAdd = () => {
    const { history } = this.props;
    history.push("/add-transaction");
  };

  getDate = (date) => {
    const dateOnly = date.split("T")[0].split("-").join("/");
    return dateOnly;
  };

  render() {
    const { transactions, isLoading } = this.state;
    return (
      <div className="main-container">
        <div className="table">
          <h1 className="heading">Office Transactions</h1>
          <button onClick={this.onClickAdd} className="add-btn">
            +Add Transaction
          </button>
        </div>

        {isLoading ? (
          <div className="spinner">
            <TailSpin
              height="50"
              width="50"
              color="black"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <div className="table-container">
            <table id="transactionsTable">
              <thead>
                <tr>
                  <th>Date</th>
                  <th className="desc">Description</th>
                  <th>Credit</th>
                  <th>Debit</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((each) => (
                  <tr key={each._id}>
                    <td>{this.getDate(each.transactionDate)}</td>
                    <td className="desc">{each.description}</td>
                    {each.transactionType === "credit" ? (
                      <td>{each.amount}</td>
                    ) : (
                      <td></td>
                    )}
                    {each.transactionType === "debit" ? (
                      <td>{each.amount}</td>
                    ) : (
                      <td></td>
                    )}
                    <td>{each.runningBalance}</td>
                  </tr>
                ))}
              </tbody>
              {transactions.length === 0 && (
                <h1 className="no-trans-head">No Transactions.</h1>
              )}
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default Transactions;
