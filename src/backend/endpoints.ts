export const ENDPOINTS = {
	openId: () => "https://accounts.google.com/.well-known/openid-configuration",
	ping: () => `${process.env.NEXT_PUBLIC_BACKEND_AUTH_ENDPOINT}/ping`,
	signUp: () => `${process.env.NEXT_PUBLIC_BACKEND_AUTH_ENDPOINT}/sign-up`,
	signIn: () => `${process.env.NEXT_PUBLIC_BACKEND_AUTH_ENDPOINT}/sign-in`,
	signOut: () => `${process.env.NEXT_PUBLIC_BACKEND_AUTH_ENDPOINT}/sign-out`,
	csrfToken: () =>
		`${process.env.NEXT_PUBLIC_BACKEND_AUTH_ENDPOINT}/csrf-token`,
	updateUser: (userId: string) =>
		`${process.env.NEXT_PUBLIC_API_ENDPOINT!}/users/${userId}`,
	createStudySet: (userId: string) =>
		`${process.env
			.NEXT_PUBLIC_API_ENDPOINT!}/study-sets/create-study-set/${userId}`,
	getStudySets: (
		userId: string,
		searchQuery?: string,
		filterSortQueryString?: string,
	) => {
		const search = searchQuery ? `search[query]=${searchQuery}&` : "";
		return `${process.env
			.NEXT_PUBLIC_API_ENDPOINT!}/study-sets/get-study-sets/${userId}?${search}${filterSortQueryString}`;
	},
	deleteStudySet: (studySetId: string) =>
		`${process.env
			.NEXT_PUBLIC_API_ENDPOINT!}/study-sets/delete-study-set/${studySetId}`,
	updateStudySet: (studySetId: string) =>
		`${process.env
			.NEXT_PUBLIC_API_ENDPOINT!}/study-sets/update-study-set/${studySetId}`,
	getSearchSuggestions: (word: string) =>
		`${process.env
			.NEXT_PUBLIC_API_ENDPOINT!}/study-sets/search-suggestions/${word}`,
	getDocuments: (studySetId: string) =>
		`${process.env
			.NEXT_PUBLIC_API_ENDPOINT!}/study-sets/get-documents/${studySetId}`,
	createFlashcardSet: (studySetId: string) =>
		`${process.env
			.NEXT_PUBLIC_API_ENDPOINT!}/flashcard-sets/create-flashcard-set/${studySetId}`,
	deleteFlashcardSet: (flashcardSetId: string) =>
		`${process.env
			.NEXT_PUBLIC_API_ENDPOINT!}/flashcard-sets/delete-flashcard-set/${flashcardSetId}`,
	getFlashcardSets: (studySetId: string) =>
		`${process.env
			.NEXT_PUBLIC_API_ENDPOINT!}/flashcard-sets/get-flashcard-sets/${studySetId}`,
	createFlashcardSetAttempt: (flashcardSetId: string) =>
		`${process.env
			.NEXT_PUBLIC_API_ENDPOINT!}/flashcard-set-attempts/create-flashcard-set-attempt/${flashcardSetId}`,
	getFlashcardSetAttempts: (flashcardSetId: string) =>
		`${process.env
			.NEXT_PUBLIC_API_ENDPOINT!}/flashcard-set-attempts/get-flashcard-set-attempts/${flashcardSetId}`,
	submitFlashcardSetAttempt: (flashcardSetAttemptId: string) =>
		`${process.env
			.NEXT_PUBLIC_API_ENDPOINT!}/flashcard-set-attempts/submit-flashcard-set-attempt/${flashcardSetAttemptId}`,
	deleteFlashcardSetAttempt: (flashcardSetAttemptId: string) =>
		`${process.env
			.NEXT_PUBLIC_API_ENDPOINT!}/flashcard-set-attempts/delete-flashcard-set-attempt/${flashcardSetAttemptId}`,
	getFlashcards: (flashcardSetId: string) =>
		`${process.env
			.NEXT_PUBLIC_API_ENDPOINT!}/flashcards/get-flashcards/${flashcardSetId}`,
	getFlashcardAttempts: (flashcardSetAttemptId: string) =>
		`${process.env
			.NEXT_PUBLIC_API_ENDPOINT!}/flashcard-attempts/get-flashcard-attempts/${flashcardSetAttemptId}`,
};
