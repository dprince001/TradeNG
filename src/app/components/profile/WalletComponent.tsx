import Button from "@/app/components/Button";
import { formatNaira } from "@/lib/utils";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import RecieveIcon from "@/app/assets/svgs/RecieveIcon";
import SendIcon from "@/app/assets/svgs/SendIcon";
import WithdrawIcon from "@/app/assets/svgs/WithdrawIcon";
import DownloadIcon from "@/app/assets/svgs/DownloadIcon";
import AddIconSvg from "@/app/assets/svgs/AddIconSvg";

interface TransactionItem {
  id: number;
  title: string;
  date: string;
  reference?: string;
  amount: number;
  type: "credit" | "debit";
}

const WalletComponent = () => {
  const [pendingWallet, setPendingWallet] = useState(45000);
  const [walletBalance, setWalletBalance] = useState(245200);
  const [totalSpent, setTotalSpent] = useState(120000);
  const [modalAmount, setModalAmount] = useState("");
  const [showWalletModal, setShowWalletModal] = useState<
    "withdraw" | "deposit" | null
  >(null);

  const [transactions, setTransactions] = useState<TransactionItem[]>([
    {
      id: 1,
      title: "Payment from Buyer",
      reference: "TRN-1234567890",
      date: "Jul 12, 2026 • 2:30 PM",
      amount: 450000,
      type: "credit",
    },
    {
      id: 2,
      title: "Withdrawal to GTBank",
      date: "Jul 10, 2026 • 9:15 AM",
      amount: 5000,
      type: "debit",
    },
    {
      id: 3,
      title: "Payment to Seller",
      date: "Jul 08, 2026 • 4:45 PM",
      amount: 120000,
      type: "debit",
    },
    {
      id: 4,
      title: "Payment from Buyer",
      date: "Jul 05, 2026 • 11:20 AM",
      amount: 35000,
      type: "credit",
    },
  ]);

  const handleWalletAction = () => {
    const amount = parseFloat(modalAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.success("Please enter a valid amount.");
      return;
    }

    if (showWalletModal === "withdraw") {
      if (amount > walletBalance) {
        toast.success("Insufficient funds.");
        return;
      }
      setWalletBalance((prev) => prev - amount);
      setTransactions((prev) => [
        {
          id: Date.now(),
          title: "Withdrawal to Bank",
          date: "Just now",
          amount: amount,
          type: "debit",
        },
        ...prev,
      ]);
      toast.success(`${formatNaira(amount)} withdrawn successfully!`);
    } else {
      setWalletBalance((prev) => prev + amount);
      setTransactions((prev) => [
        {
          id: Date.now(),
          title: "Deposit to Wallet",
          date: "Just now",
          amount: amount,
          type: "credit",
        },
        ...prev,
      ]);
      toast.success(`${formatNaira(amount)} added successfully!`);
    }
    setModalAmount("");
    setShowWalletModal(null);
  };

  return (
    <div className="flex-1 flex flex-col px-5 pt-6 pb-24">
      {/* Wallet Balance Card */}
      <div className="bg-brand-gradient rounded-3xl p-6 text-white shadow-[0_10px_24px_rgba(255,67,4,0.15)] relative overflow-hidden">
        {/* Background abstract designs */}
        <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8 pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8 pointer-events-none" />

        <span className="text-[10px] font-semibold uppercase tracking-wider text-white/70 block">
          Total Balance
        </span>
        <h2 className="text-3xl font-extrabold mt-1.5 tracking-tight">
          {formatNaira(walletBalance)}
        </h2>

        <div className="">
          <div className="grid grid-cols-2 gap-3 pt-4">
            <div className="bg-gray-50/30 text-center items-center my-6 p-4 rounded-md ">
              <span className="text-xl font-bold mt-0.5 block">
                {formatNaira(pendingWallet)}
              </span>
              <span className="text-[9px] font-semibold text-white/60 uppercase block">
                Available
              </span>
            </div>
            <div className="bg-gray-50/30 text-center items-center my-6 p-4 rounded-md ">
              <span className="text-xl font-bold mt-0.5 block">
                {formatNaira(totalSpent)}
              </span>
              <span className="text-[9px] font-semibold text-white/60 uppercase block">
                In Escrow
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowWalletModal("withdraw")}
              className="flex-1 bg-gray-50/30 hover:bg-white/20 active:scale-95 text-xs  items-center justify-center gap-1.5"
            >
              <DownloadIcon /> Withdraw
            </Button>
            <Button
              onClick={() => setShowWalletModal("deposit")}
              className="flex-1 bg-gray-50/30 hover:bg-white/20 active:scale-95 text-xs  items-center justify-center gap-1.5"
            >
              <AddIconSvg />
              Add funds
            </Button>
          </div>
        </div>
      </div>

      {/* Verification Warning message */}
      <div className="bg-[#FFF5F3] border border-primary/5 rounded-2xl p-4 mt-5 flex items-start gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
        <span className="text-[10px] text-text-secondary leading-relaxed font-semibold">
          Funds are held safely until buyer confirms delivery
        </span>
      </div>

      {/* Transaction History */}
      <h3 className="text-xs font-extrabold text-[#1D1E20] uppercase tracking-wider mt-7 mb-3.5">
        Transaction History
      </h3>

      <div className="flex flex-col gap-3">
        {transactions.map((tx) => {
          const isCredit = tx.type === "credit";
          return (
            <div
              key={tx.id}
              className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-[0_2px_6px_rgba(0,0,0,0.01)]"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full ${
                    isCredit
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-500"
                  } flex items-center justify-center flex-shrink-0`}
                >
                  {isCredit ? <RecieveIcon /> : <WithdrawIcon />}
                </div>

                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-bold text-[#1D1E20] leading-tight">
                    {tx.title}
                  </span>
                  <span className="text-xs text-[#8F959E]">{tx.reference}</span>
                  <span className="text-[11px] text-[#8F959E] font-medium">
                    {tx.date}
                  </span>
                </div>
              </div>

              <span
                className={`text-xs font-extrabold ${isCredit ? "text-green-600" : "text-red-500"}`}
              >
                {isCredit ? "+" : "-"}
                {formatNaira(tx.amount)}
              </span>
            </div>
          );
        })}
      </div>
      <Dialog
        open={showWalletModal !== null}
        onOpenChange={(open) => {
          if (!open) {
            setModalAmount("");
            setShowWalletModal(null);
          }
        }}
      >
        <DialogContent className="max-w-sm rounded-3xl p-6 bg-white border border-gray-150">
          <DialogHeader>
            <DialogTitle className="text-base font-extrabold text-[#1D1E20] leading-none mb-1">
              {showWalletModal === "withdraw"
                ? "Withdraw Funds"
                : "Deposit Funds"}
            </DialogTitle>
            <DialogDescription className="text-[10px] text-text-secondary leading-normal mb-2">
              {showWalletModal === "withdraw"
                ? "Specify the amount you wish to withdraw to your bank account."
                : "Specify the amount you wish to deposit to your TradeNG wallet."}
            </DialogDescription>
          </DialogHeader>

          <div className="relative my-3">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-extrabold text-sm">
              ₦
            </span>
            <input
              type="number"
              value={modalAmount}
              onChange={(e) => setModalAmount(e.target.value)}
              placeholder="0"
              className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-[#1D1E20] placeholder-gray-400 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
              autoFocus
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 text-[#1D1E20] border-gray-200"
              onClick={() => {
                setModalAmount("");
                setShowWalletModal(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleWalletAction}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WalletComponent;
