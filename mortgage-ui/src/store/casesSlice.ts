import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { CaseDto } from '@/types/customer.types'
import apiClient from '@/api/client'

// Async thunk — שולף תיקים מהשרת
export const fetchCases = createAsyncThunk('cases/fetchAll', async () => {
  const res = await apiClient.get<CaseDto[]>('/customer/cases')
  return res.data
})

interface CasesState {
  data: CaseDto[]
  loading: boolean
  error: string | null
}

const initialState: CasesState = { data: [], loading: false, error: null }

const casesSlice = createSlice({
  name: 'cases',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCases.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCases.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchCases.rejected, (state) => {
        state.loading = false
        state.error = 'שגיאה בטעינת התיקים'
      })
  },
})

export default casesSlice.reducer
