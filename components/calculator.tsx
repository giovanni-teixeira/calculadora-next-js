"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  // Função para inserir números
  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  // Função para inserir ponto decimal
  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".")
    }
  }

  // Função para limpar calculadora
  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  // Função para realizar operações
  const performOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  // Função para calcular resultado
  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "*":
        return firstValue * secondValue
      case "/":
        return firstValue / secondValue
      case "=":
        return secondValue
      default:
        return secondValue
    }
  }

  // Função para calcular resultado final
  const calculateResult = () => {
    const inputValue = Number.parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm p-6 bg-card shadow-lg">
        <div className="space-y-4">
          {/* Display da calculadora */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="text-right text-3xl font-mono font-bold text-foreground min-h-[3rem] flex items-center justify-end overflow-hidden">
              {display}
            </div>
          </div>

          {/* Botões da calculadora */}
          <div className="grid grid-cols-4 gap-3">
            {/* Primeira linha: Clear e operações */}
            <Button
              onClick={clear}
              className="col-span-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold text-lg h-12"
            >
              C
            </Button>
            <Button
              onClick={() => performOperation("/")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg h-12"
            >
              ÷
            </Button>
            <Button
              onClick={() => performOperation("*")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg h-12"
            >
              ×
            </Button>

            {/* Segunda linha: 7, 8, 9, - */}
            <Button
              onClick={() => inputNumber("7")}
              className="bg-card hover:bg-muted text-card-foreground font-bold text-lg h-12 border border-border"
            >
              7
            </Button>
            <Button
              onClick={() => inputNumber("8")}
              className="bg-card hover:bg-muted text-card-foreground font-bold text-lg h-12 border border-border"
            >
              8
            </Button>
            <Button
              onClick={() => inputNumber("9")}
              className="bg-card hover:bg-muted text-card-foreground font-bold text-lg h-12 border border-border"
            >
              9
            </Button>
            <Button
              onClick={() => performOperation("-")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg h-12"
            >
              −
            </Button>

            {/* Terceira linha: 4, 5, 6, + */}
            <Button
              onClick={() => inputNumber("4")}
              className="bg-card hover:bg-muted text-card-foreground font-bold text-lg h-12 border border-border"
            >
              4
            </Button>
            <Button
              onClick={() => inputNumber("5")}
              className="bg-card hover:bg-muted text-card-foreground font-bold text-lg h-12 border border-border"
            >
              5
            </Button>
            <Button
              onClick={() => inputNumber("6")}
              className="bg-card hover:bg-muted text-card-foreground font-bold text-lg h-12 border border-border"
            >
              6
            </Button>
            <Button
              onClick={() => performOperation("+")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg h-12"
            >
              +
            </Button>

            {/* Quarta linha: 1, 2, 3, = (parte 1) */}
            <Button
              onClick={() => inputNumber("1")}
              className="bg-card hover:bg-muted text-card-foreground font-bold text-lg h-12 border border-border"
            >
              1
            </Button>
            <Button
              onClick={() => inputNumber("2")}
              className="bg-card hover:bg-muted text-card-foreground font-bold text-lg h-12 border border-border"
            >
              2
            </Button>
            <Button
              onClick={() => inputNumber("3")}
              className="bg-card hover:bg-muted text-card-foreground font-bold text-lg h-12 border border-border"
            >
              3
            </Button>
            <Button
              onClick={calculateResult}
              className="row-span-2 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-xl"
            >
              =
            </Button>

            {/* Quinta linha: 0, . */}
            <Button
              onClick={() => inputNumber("0")}
              className="col-span-2 bg-card hover:bg-muted text-card-foreground font-bold text-lg h-12 border border-border"
            >
              0
            </Button>
            <Button
              onClick={inputDecimal}
              className="bg-card hover:bg-muted text-card-foreground font-bold text-lg h-12 border border-border"
            >
              .
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
