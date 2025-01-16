import { ref, watch } from 'vue'
import { useProjectStore } from '../stores/projectStore'
import debounce from 'lodash/debounce'

export function useSearch() {
  const store = useProjectStore()
  const showSearchBar = ref(false)
  const searchInput = ref('')
  const showRecentSearches = ref(false)
  const lastSearchValue = ref('') // Adicionamos essa ref para guardar o último valor

  const debouncedSearch = debounce((query: string) => {
    if (query.length >= 3) {
      store.searchQuery = query
      store.addToRecentSearches(query)
    } else {
      store.searchQuery = ''
    }
  }, 1000)

  watch(searchInput, (newValue) => {
    debouncedSearch(newValue)
  })

  const toggleSearchBar = () => {
    if (showSearchBar.value) {
      lastSearchValue.value = searchInput.value
    } else {
      searchInput.value = lastSearchValue.value
    }
    showSearchBar.value = !showSearchBar.value
  }

  const selectRecentSearch = (search: string) => {
    searchInput.value = search
    lastSearchValue.value = search
    showRecentSearches.value = false
  }

  const removeRecentSearch = (search: string) => {
    store.recentSearches = store.recentSearches.filter((s) => s !== search)
    localStorage.setItem('recentSearches', JSON.stringify(store.recentSearches))
  }

  const handleBlur = () => {
    setTimeout(() => {
      showRecentSearches.value = false
    }, 200)
  }

  return {
    showSearchBar,
    searchInput,
    showRecentSearches,
    store,
    toggleSearchBar,
    selectRecentSearch,
    removeRecentSearch,
    handleBlur,
  }
}
