// ADMIN FUNCTIONS - For development/testing only
import { supabase } from './supabase'

export const resetAllVotes = async (): Promise<{ success: boolean; message: string }> => {
  try {
    if (!supabase) {
      return { success: false, message: 'Supabase client not initialized' }
    }
    
    const { error } = await supabase
      .from('votes')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all except non-existent ID
    
    if (error) {
      console.error('Error resetting votes:', error)
      return { success: false, message: `Error: ${error.message}` }
    }

    return { success: true, message: 'All votes have been reset to zero!' }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { success: false, message: 'Unexpected error occurred' }
  }
}
