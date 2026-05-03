import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs'
import {
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Loader2,
  Upload,
  Eye,
  ClockIcon,
  Loader
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import CreditScoreGauge from '../components/CreditScoreGauge'
import { api } from '../lib/api'
import { useSiteTheme } from '../theme/ThemeProvider.jsx'
import { getHomeSkin } from '../theme/homeSkins.js'

export default function ApplicationStatus () {
  const { code } = useParams()
  const { t, i18n } = useTranslation()
  const theme = useSiteTheme()
  const skin = getHomeSkin(theme.id)
  const currentLanguage = i18n.language || 'en'
  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [documentTypes, setDocumentTypes] = useState({})
  const [additionalDocumentTypes, setAdditionalDocumentTypes] = useState({})
  const [selectedDocumentType, setSelectedDocumentType] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [activeTab, setActiveTab] = useState('status')
  const fileInputRef = useRef(null)
  const additionalFileInputRef = useRef(null)

  // Helper function to flatten grouped documents into array
  const flattenDocuments = docs => {
    if (!docs) return []
    if (Array.isArray(docs)) return docs
    if (typeof docs === 'object') {
      return Object.values(docs).flat()
    }
    return []
  }

  useEffect(() => {
    const fetchApplication = async () => {
      if (!code) {
        setError('Application code is required')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const response = await api.getApplicationStatus(code)

        // Check if application was found
        if (!response.data) {
          setApplication(null)
          setLoading(false)
          return
        }

        setApplication(response.data)

        // Always fetch normal documents for the Documents tab
        try {
          const docResponse = await api.getDocuments('normal')
          // Handle grouped response - store as grouped structure
          const groupedData = docResponse.data || {}
          setDocumentTypes(
            Array.isArray(groupedData) ? groupedData : groupedData
          )
        } catch (docErr) {
          console.error('Failed to fetch document types:', docErr)
          setDocumentTypes({})
        }

        // Fetch additional document types if there are additional_documents
        if (
          response.data?.additional_documents &&
          response.data.additional_documents.length > 0
        ) {
          try {
            const additionalDocResponse = await api.getDocuments('additional')
            // Handle grouped response - store as grouped structure
            const groupedData = additionalDocResponse.data || {}
            const allAdditionalDocs = Array.isArray(groupedData)
              ? groupedData
              : Object.values(groupedData).flat()
            // Filter to only include documents that are in the additional_documents array
            const requiredAdditionalDocIds =
              response.data.additional_documents || []
            const filteredAdditionalDocs = allAdditionalDocs.filter(doc => {
              // Handle both string and number ID comparisons
              return requiredAdditionalDocIds.some(
                id =>
                  Number(id) === Number(doc.id) || String(id) === String(doc.id)
              )
            })
            // Group filtered documents by category
            const groupedFiltered = {}
            filteredAdditionalDocs.forEach(doc => {
              const category = doc.category_en || 'Uncategorized'
              if (!groupedFiltered[category]) {
                groupedFiltered[category] = []
              }
              groupedFiltered[category].push(doc)
            })
            // Sort documents within each category by order
            Object.keys(groupedFiltered).forEach(category => {
              groupedFiltered[category].sort((a, b) => a.order - b.order)
            })
            // Sort categories by minimum order value
            const sortedCategories = Object.keys(groupedFiltered).sort(
              (a, b) => {
                const minOrderA = Math.min(
                  ...groupedFiltered[a].map(d => d.order)
                )
                const minOrderB = Math.min(
                  ...groupedFiltered[b].map(d => d.order)
                )
                return minOrderA - minOrderB
              }
            )
            const sortedGrouped = {}
            sortedCategories.forEach(cat => {
              sortedGrouped[cat] = groupedFiltered[cat]
            })
            setAdditionalDocumentTypes(sortedGrouped)
          } catch (docErr) {
            console.error('Failed to fetch additional document types:', docErr)
            setAdditionalDocumentTypes({})
          }
        } else {
          setAdditionalDocumentTypes({})
        }
      } catch (err) {
        // Check if it's a 404 (not found) error
        if (
          err.message &&
          (err.message.toLowerCase().includes('not found') ||
            err.message.toLowerCase().includes('application not found') ||
            err.message.toLowerCase().includes('404'))
        ) {
          setApplication(null)
          setError(null)
        } else {
          setError(err.message || t('applicationStatus.errorLoading'))
        }
      } finally {
        setLoading(false)
      }
    }

    fetchApplication()
  }, [code])

  const getStatusIcon = status => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return <CheckCircle className='w-6 h-6 text-green-600' />
      case 'rejected':
        return <XCircle className='w-6 h-6 text-red-600' />
      case 'in_review':
      case 'in review':
        return <Clock className='w-6 h-6 text-yellow-600' />
      case 'pending':
      default:
        return <Clock className='w-6 h-6 text-brand-navy-700' />
    }
  }

  const getStatusBadge = status => {
    const hasCollectionDate = application.collection_date ? true : false
    const statusLower = status?.toLowerCase() || 'pending'
    const statusMap = {
      approved: {
        label: t('applicationStatus.completed'),
        className: 'bg-green-100 text-green-800 border-green-300'
      },
      submitted: hasCollectionDate
        ? {
            label: t('applicationStatus.completed'),
            className: 'bg-green-100 text-green-800 border-green-300'
          }
        : {
            label: t('applicationStatus.submitted'),
            className: 'bg-green-100 text-green-800 border-green-300'
          },
      rejected: {
        label: t('applicationStatus.rejected'),
        className: 'bg-red-100 text-red-800 border-red-300'
      },
      in_review: {
        label: t('applicationStatus.inReview'),
        className: 'bg-yellow-100 text-yellow-800 border-yellow-300'
      },
      'in review': {
        label: t('applicationStatus.inReview'),
        className: 'bg-yellow-100 text-yellow-800 border-yellow-300'
      },
      pending: {
        label: t('applicationStatus.pending'),
        className: 'bg-brand-navy-100 text-brand-navy-900 border-brand-navy-300'
      }
    }

    const statusInfo = statusMap[statusLower] || statusMap['pending']
    return (
      <span
        className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${statusInfo.className}`}
      >
        {statusInfo.label}
      </span>
    )
  }

  const getInfoStatusBadge = status => {
    const statusLower = status?.toLowerCase() || 'pending'
    const statusMap = {
      pending: {
        label: t('applicationStatus.pending'),
        className: 'bg-brand-navy-100 text-brand-navy-900 border-brand-navy-300'
      },
      approved: {
        label: t('applicationStatus.confirmed'),
        className: 'bg-green-100 text-green-800 border-green-300'
      }
    }
    const statusInfo = statusMap[statusLower] || statusMap['pending']
    return (
      <span
        className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${statusInfo.className}`}
      >
        {statusInfo.label}
      </span>
    )
  }

  const formatDate = dateString => {
    if (!dateString) return 'N/A'
    try {
      // get language code
      const languageCode = currentLanguage === 'zh' ? 'zh-CN' : 'en-US'
      const date = new Date(dateString)
      return date.toLocaleDateString(languageCode, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  const handleFileSelect = async (e, documentTypeId = null) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      setUploadError(t('applicationStatus.fileSizeError'))
      setSelectedFile(null)
      return
    }

    // If documentTypeId is provided, use it; otherwise use selectedDocumentType
    const docTypeId = documentTypeId || selectedDocumentType
    if (!docTypeId) {
      setUploadError(t('applicationStatus.pleaseSelectDocumentType'))
      return
    }

    setSelectedFile(file)
    setUploadError(null)

    // Automatically upload the file
    try {
      setUploading(true)
      setUploadError(null)
      await api.uploadDocument(code, file, docTypeId)

      // Refresh application data to show new document
      const appResponse = await api.getApplicationStatus(code)
      setApplication(appResponse.data)

      // Reset form
      setSelectedFile(null)
      setSelectedDocumentType('')
      if (e.target) e.target.value = ''
    } catch (err) {
      setUploadError(err.message || t('applicationStatus.uploadError'))
      setSelectedFile(null)
    } finally {
      setUploading(false)
    }
  }

  const handleDocumentClick = (documentTypeId, isUploaded, inputRef) => {
    if (uploading || isUploaded) return

    setSelectedDocumentType(documentTypeId.toString())
    setUploadError(null)

    // Trigger file input
    if (inputRef?.current) {
      inputRef.current.click()
    }
  }

  const handleFileUpload = async () => {
    if (!selectedDocumentType) {
      setUploadError(t('applicationStatus.pleaseSelectDocumentType'))
      return
    }

    if (!selectedFile) {
      setUploadError(t('applicationStatus.pleaseSelectFile'))
      return
    }

    try {
      setUploading(true)
      setUploadError(null)
      await api.uploadDocument(code, selectedFile, selectedDocumentType)

      // Refresh application data to show new document
      const appResponse = await api.getApplicationStatus(code)
      setApplication(appResponse.data)

      // Reset form
      setSelectedFile(null)
      setSelectedDocumentType('')
      if (fileInputRef.current) fileInputRef.current.value = ''
      if (additionalFileInputRef.current)
        additionalFileInputRef.current.value = ''
    } catch (err) {
      setUploadError(err.message || t('applicationStatus.uploadError'))
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return (
      <div className='pt-24 min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <Loader2 className='w-12 h-12 animate-spin text-brand-navy-700 mx-auto mb-4' />
          <p className='text-gray-600'>
            {t('applicationStatus.loadingStatus')}
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    const isRateLimitError = error.toLowerCase().includes('too many requests')

    return (
      <div className='pt-24'>
        <PageHeader
          title={t('applicationStatus.title')}
          subtitle={t('applicationStatus.subtitle')}
          badge={t('applicationStatus.status')}
          icon={FileText}
        />
        <section className={skin.pageSectionPrimary}>
          <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
            <Card className='border-2 shadow-xl'>
              <CardContent className='p-8 text-center'>
                <AlertCircle
                  className={`w-16 h-16 ${
                    isRateLimitError ? 'text-yellow-500' : 'text-red-500'
                  } mx-auto mb-4`}
                />
                <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                  {isRateLimitError
                    ? t('applicationStatus.rateLimitExceeded')
                    : t('common.error')}
                </h2>
                <p className='text-gray-600 mb-4'>{error}</p>
                {isRateLimitError && (
                  <p className='text-sm text-gray-500 mb-6'>
                    {t('applicationStatus.rateLimitMessage')}
                  </p>
                )}
                {isRateLimitError && (
                  <div className='flex justify-center'>
                    <Button size='lg' onClick={() => window.location.reload()}>
                      {t('applicationStatus.tryAgain')}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    )
  }

  if (!application) {
    return (
      <div className='pt-24'>
        <PageHeader
          title={t('applicationStatus.title')}
          subtitle={t('applicationStatus.subtitle')}
          badge={t('applicationStatus.status')}
          icon={FileText}
        />
        <section className={skin.pageSectionPrimary}>
          <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
            <Card className='border-2 shadow-xl'>
              <CardContent className='p-8 text-center'>
                <AlertCircle className='w-16 h-16 text-yellow-500 mx-auto mb-4' />
                <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                  {t('applicationStatus.applicationNotFound')}
                </h2>
                <p className='text-gray-600 mb-6'>
                  {t('applicationStatus.applicationNotFoundMessage')}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className='pt-24'>
      <PageHeader
        title={t('applicationStatus.title')}
        subtitle={`${t('applicationStatus.applicationCode')}: ${
          application.application_code
        }`}
        badge={t('applicationStatus.status')}
        icon={FileText}
      />

      <section className={skin.pageSectionPrimary}>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Collection Information Card - Only show when status is approved */}
          {application.status === 'approved' &&
            (() => {
              // Get required additional document type IDs
              const requiredDocumentTypeIds =
                application.additional_documents || []

              // Get submitted additional documents
              const additionalDocuments =
                application.documents?.filter(doc => {
                  return doc.document?.type === 'additional'
                }) || []

              // Get submitted document type IDs
              const submittedDocumentTypeIds = additionalDocuments
                .map(doc => doc.document_id)
                .filter(Boolean)

              // Check if all required document types have been submitted
              const allRequiredSubmitted =
                requiredDocumentTypeIds.length === 0 ||
                requiredDocumentTypeIds.every(id =>
                  submittedDocumentTypeIds.includes(id)
                )

              // Check if all submitted additional documents are approved
              const allAdditionalApproved =
                additionalDocuments.length === 0 ||
                additionalDocuments.every(doc => doc.status === 'approved')

              const hasNoAdditionalDocuments = additionalDocuments.length === 0
              // Get missing required documents
              const missingApprovedDocuments =
                additionalDocuments.length > 0 ||
                additionalDocuments.every(doc => doc.status !== 'approved')

              const missingDocumentIds = requiredDocumentTypeIds.filter(
                id =>
                  !submittedDocumentTypeIds.some(
                    submittedId =>
                      Number(id) === Number(submittedId) ||
                      String(id) === String(submittedId)
                  )
              )

              // Check if any submitted additional documents have pending status
              const hasPendingDocuments = additionalDocuments.some(
                doc =>
                  doc.status === 'pending' ||
                  doc.status === 'in_review' ||
                  doc.status === 'in review'
              )

              // Determine card state based on requirements:
              // 1. If has missing documents (not uploaded): Red with Alert icon + "pendingRequiredDocument"
              // 2. If has pending documents (uploaded but not approved): Green with Check icon + "进行中"
              // 3. If no collection_date/address AND no missing/pending documents: Grey with Clock icon + "提交中"
              // 4. If has collection_date/address AND no missing documents AND no pending documents: Green with Check icon + "已批准"
              const hasCollectionDate = !!application.collection_date
              const hasCollectionAddress = !!application.collection_location
              const hasCollectionInfo =
                hasCollectionDate || hasCollectionAddress
              const hasMissingDocuments = missingDocumentIds.length > 0

              // Special case: No collection info + missing documents + pending documents = InProgress (Green)
              const isInProgressWithBoth =
                !hasCollectionInfo && hasMissingDocuments

              // State 1: Missing documents (not uploaded yet) - Red
              // But not red if we have the special case above
              const isRed = hasMissingDocuments && !isInProgressWithBoth

              // State 2: Pending documents (uploaded but not approved) - Green with "进行中"
              const isPendingGreen = hasPendingDocuments && !hasMissingDocuments

              // State 3: No collection info and no issues - Grey with "提交中"
              const isGrey =
                !hasCollectionInfo &&
                !hasMissingDocuments &&
                !hasPendingDocuments

              // State 4: Has collection info and all clear - Green with "已批准"
              const isApprovedGreen =
                hasCollectionInfo &&
                !hasMissingDocuments &&
                !hasPendingDocuments

              return (
                <div className='pt-6 mt-6 mb-6'>
                  <Card
                    className={`border-2 shadow-lg ${
                      isRed
                        ? 'border-red-300 bg-red-50'
                        : isGrey
                        ? 'border-gray-300 bg-gray-100'
                        : 'border-green-200 bg-green-50'
                    }`}
                  >
                    <CardHeader>
                      <CardTitle
                        className={`text-2xl flex items-center gap-2 ${
                          isRed
                            ? 'text-red-800'
                            : isGrey
                            ? 'text-gray-700'
                            : 'text-green-800'
                        }`}
                      >
                        {isGrey ? (
                          <>
                            <Clock className='w-6 h-6 text-gray-600' />
                            {t('applicationStatus.submitted')}
                          </>
                        ) : isInProgressWithBoth ? (
                          <>
                            <Loader className='w-6 h-6 text-green-600' />
                            {t('applicationStatus.inProgress')}
                          </>
                        ) : (
                          <>
                            {!isRed && hasNoAdditionalDocuments ? (
                              <>
                                <CheckCircle className='w-6 h-6 text-green-600' />
                                {t('applicationStatus.inProgress')}
                              </>
                            ) : (
                              <>
                                {!isRed && !hasNoAdditionalDocuments ? (
                                  <>
                                    <Loader className='w-6 h-6 text-green-600' />
                                    {t('applicationStatus.inProgress')}
                                  </>
                                ) : (
                                  <>
                                    <AlertCircle className='w-6 h-6 text-red-600' />
                                    {t(
                                      'applicationStatus.pendingRequiredDocument'
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      {application.collection_date ? (
                        <div>
                          <p
                            className={`text-sm font-medium mb-1 ${
                              isRed
                                ? 'text-red-800'
                                : isGrey
                                ? 'text-gray-700'
                                : 'text-gray-700'
                            }`}
                          >
                            {t('applicationStatus.collectionDate')}
                          </p>
                          <p
                            className={`text-lg font-semibold ${
                              isRed
                                ? 'text-red-900'
                                : isGrey
                                ? 'text-gray-900'
                                : 'text-gray-900'
                            }`}
                          >
                            {new Date(
                              application.collection_date
                            ).toLocaleDateString(
                              currentLanguage === 'zh' ? 'zh-CN' : 'en-US',
                              {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              }
                            )}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p
                            className={`text-sm font-medium mb-1 ${
                              isRed
                                ? 'text-red-800'
                                : isGrey
                                ? 'text-gray-700'
                                : 'text-gray-700'
                            }`}
                          >
                            {t('applicationStatus.collectionDate')}
                          </p>
                          <p
                            className={`text-base italic ${
                              isRed
                                ? 'text-red-700'
                                : isGrey
                                ? 'text-gray-600'
                                : 'text-gray-600'
                            }`}
                          >
                            {t('applicationStatus.toBeAnnounced')}
                          </p>
                        </div>
                      )}
                      {application.collection_location ? (
                        <div>
                          <p
                            className={`text-sm font-medium mb-1 ${
                              isRed
                                ? 'text-red-800'
                                : isGrey
                                ? 'text-gray-700'
                                : 'text-gray-700'
                            }`}
                          >
                            {t('applicationStatus.collectionLocation')}
                          </p>
                          <p
                            className={`text-base mb-2 ${
                              isRed
                                ? 'text-red-900'
                                : isGrey
                                ? 'text-gray-900'
                                : 'text-gray-900'
                            }`}
                          >
                            {t('applicationStatus.collectionMessage', {
                              type:
                                application.application_type === 'pr'
                                  ? t('applicationStatus.pr')
                                  : t('applicationStatus.citizenship')
                            })}
                          </p>
                          <p
                            className={`text-lg font-semibold mt-2 bg-white p-3 rounded border ${
                              isRed
                                ? 'text-red-900 border-red-300'
                                : isGrey
                                ? 'text-gray-900 border-gray-300'
                                : 'text-gray-900 border-green-200'
                            }`}
                          >
                            {application.collection_location}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p
                            className={`text-sm font-medium mb-1 ${
                              isRed
                                ? 'text-red-800'
                                : isGrey
                                ? 'text-gray-700'
                                : 'text-gray-700'
                            }`}
                          >
                            {t('applicationStatus.collectionLocation')}
                          </p>
                          <p
                            className={`text-base italic ${
                              isRed
                                ? 'text-red-700'
                                : isGrey
                                ? 'text-gray-600'
                                : 'text-gray-600'
                            }`}
                          >
                            {t('applicationStatus.collectionMessagePending', {
                              type:
                                application.application_type === 'pr'
                                  ? t('applicationStatus.pr')
                                  : t('applicationStatus.citizenship')
                            })}
                          </p>
                        </div>
                      )}

                      {/* Required Documents Section - Show in red card if documents are missing */}
                      {hasMissingDocuments && (
                        // {hasMissingDocuments && (
                        <div
                          className={`mt-4 p-4 ${
                            !isInProgressWithBoth
                              ? 'bg-red-100 border-2 border-red-400'
                              : 'bg-gray-100 border-2 border-gray-400'
                          } rounded-lg`}
                        >
                          <h4 className='text-sm font-semibold text-red-900 mb-2'>
                            {isInProgressWithBoth ? (
                              <>{t('applicationStatus.requiredDocuments')}:</>
                            ) : (
                              <>{t('applicationStatus.requiredDocuments')}:</>
                            )}
                          </h4>
                          <ul className='text-sm text-red-800 space-y-1 list-disc list-inside'>
                            {(() => {
                              // Get document names for missing documents from additional document types
                              const allDocumentTypes = [
                                ...flattenDocuments(documentTypes),
                                ...flattenDocuments(additionalDocumentTypes)
                              ]
                              if (allDocumentTypes.length > 0) {
                                const missingDocs = allDocumentTypes.filter(
                                  doc =>
                                    missingDocumentIds.some(
                                      id =>
                                        Number(id) === Number(doc.id) ||
                                        String(id) === String(doc.id)
                                    )
                                )
                                if (missingDocs.length > 0) {
                                  return missingDocs.map(doc => {
                                    // Get the date from additional_document_dates
                                    const documentDate =
                                      application.additional_document_dates?.[
                                        doc.id
                                      ] || null
                                    return (
                                      <li key={doc.id}>
                                        {currentLanguage === 'zh'
                                          ? doc.name_zh || doc.name_en
                                          : doc.name_en}
                                        {documentDate
                                          ? ` - ${formatDate(documentDate)}`
                                          : ''}
                                        {doc.description_en ||
                                        doc.description_zh ? (
                                          <p className='text-xs text-gray-500 mt-1'>
                                            {currentLanguage === 'zh'
                                              ? doc.description_zh ||
                                                doc.description_en
                                              : doc.description_en}
                                          </p>
                                        ) : null}
                                      </li>
                                    )
                                  })
                                }
                              }
                              // Fallback: show document IDs if types not loaded
                              return missingDocumentIds.map(id => (
                                <li key={id}>Document ID: {id}</li>
                              ))
                            })()}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )
            })()}
          <Card className='border-2 shadow-xl mb-6'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-3xl'>
                  {t('applicationStatus.title')}
                </CardTitle>
              </div>
              <CardDescription className='text-base mt-2'>
                {t('applicationStatus.submittedOn')}{' '}
                {formatDate(application.created_at)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className='grid w-full grid-cols-2 mb-6'>
                  <TabsTrigger value='status'>
                    {t('applicationStatus.tabs.applicationStatus')}
                  </TabsTrigger>
                  <TabsTrigger value='documents'>
                    {t('applicationStatus.tabs.requiredDocuments')}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value='status' className='space-y-6'>
                  <div className='bg-brand-navy-50 p-6 rounded-lg border-2 border-brand-navy-200'>
                    <h3 className='font-semibold text-gray-900 mb-4 text-lg'>
                      {t('applicationStatus.applicationInformation')}
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <p className='text-sm text-gray-600'>
                          {t('applicationStatus.applicationCode')}
                        </p>
                        <p className='font-mono font-bold text-lg text-brand-navy-700'>
                          {application.application_code}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm text-gray-600'>
                          {t('applicationStatus.applicationType')}
                        </p>
                        <p className='font-semibold text-gray-900 capitalize'>
                          {application.application_type.toUpperCase()}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm text-gray-600'>
                          {t('applicationStatus.status')}
                        </p>
                        <div className='mt-1'>
                          {getInfoStatusBadge(application.status)}
                        </div>
                      </div>
                      <div>
                        <p className='text-sm text-gray-600'>
                          {t('applicationStatus.submittedDate')}
                        </p>
                        <p className='font-semibold text-gray-900'>
                          {formatDate(application.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Credit Score Gauge - Only show when status is approved */}
                  {application.status === 'approved' &&
                    application.total_score !== undefined && (
                      <div className='border-t pt-6 mt-6'>
                        <CreditScoreGauge score={application.total_score} />
                        {(() => {
                          // Check if there are unsubmitted additional documents
                          const requiredDocumentTypeIds =
                            application.additional_documents || []

                          // If no additional documents are required, don't show button
                          if (requiredDocumentTypeIds.length === 0) {
                            return null
                          }

                          // Get submitted additional documents
                          // Check both doc.document?.type and also check if document_id is in additional_documents
                          const additionalDocuments =
                            application.documents?.filter(doc => {
                              // Check if document type is additional OR if document_id is in additional_documents array
                              return (
                                doc.document?.type === 'additional' ||
                                requiredDocumentTypeIds.some(
                                  id =>
                                    Number(id) === Number(doc.document_id) ||
                                    String(id) === String(doc.document_id)
                                )
                              )
                            }) || []

                          const submittedDocumentTypeIds = additionalDocuments
                            .map(doc => doc.document_id)
                            .filter(Boolean)

                          const missingDocumentIds =
                            requiredDocumentTypeIds.filter(
                              id =>
                                !submittedDocumentTypeIds.some(
                                  submittedId =>
                                    Number(id) === Number(submittedId) ||
                                    String(id) === String(submittedId)
                                )
                            )

                          // Get pending additional documents (uploaded but not approved)
                          const pendingAdditionalDocuments =
                            additionalDocuments.filter(
                              doc =>
                                doc.status === 'pending' ||
                                doc.status === 'in_review' ||
                                doc.status === 'rejected'
                            )

                          // Get submitted (approved) additional documents
                          const submittedAdditionalDocuments =
                            additionalDocuments.filter(
                              doc => doc.status === 'approved'
                            )

                          const hasUnsubmittedAdditionalDocs =
                            missingDocumentIds.length > 0
                          const hasPendingAdditionalDocs =
                            pendingAdditionalDocuments.length > 0
                          const hasSubmittedAdditionalDocs =
                            submittedAdditionalDocuments.length > 0

                          if (
                            hasUnsubmittedAdditionalDocs ||
                            hasPendingAdditionalDocs ||
                            hasSubmittedAdditionalDocs
                          ) {
                            // Get all document types for name lookup
                            const allDocumentTypes = [
                              ...flattenDocuments(documentTypes),
                              ...flattenDocuments(additionalDocumentTypes)
                            ]

                            // Helper function to render uploadable document item
                            const renderUploadableDocument = docType => {
                              const uploadedDoc = additionalDocuments.find(
                                ad => ad.document_id === docType.id
                              )
                              const isUploaded = !!uploadedDoc
                              const isPending =
                                uploadedDoc &&
                                (uploadedDoc.status === 'pending' ||
                                  uploadedDoc.status === 'in_review' ||
                                  uploadedDoc.status === 'in review')
                              const isRejected =
                                uploadedDoc && uploadedDoc.status === 'rejected'
                              const isSelected =
                                selectedDocumentType === docType.id.toString()
                              const isUploadingForThis = uploading && isSelected

                              // Get the date from additional_document_dates
                              const documentDate =
                                application.additional_document_dates?.[
                                  docType.id
                                ] || null

                              return (
                                <div
                                  key={docType.id}
                                  onClick={() => {
                                    if (
                                      !uploading &&
                                      (!isUploaded || isPending || isRejected)
                                    ) {
                                      handleDocumentClick(
                                        docType.id,
                                        isUploaded && !isPending && !isRejected,
                                        additionalFileInputRef
                                      )
                                    }
                                  }}
                                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all mb-2 ${
                                    isSelected
                                      ? 'border-brand-navy-600 bg-brand-navy-50'
                                      : isRejected
                                      ? 'border-red-400 bg-red-50 hover:border-red-500 hover:bg-red-100'
                                      : isUploaded && !isPending
                                      ? 'border-green-300 bg-green-50 cursor-not-allowed opacity-75'
                                      : 'border-yellow-400 bg-white hover:border-yellow-500 hover:bg-yellow-100'
                                  } ${
                                    uploading ||
                                    (isUploaded && !isPending && !isRejected)
                                      ? 'cursor-not-allowed'
                                      : ''
                                  }`}
                                >
                                  <div className='flex items-center justify-between'>
                                    <div className='flex-1'>
                                      <p
                                        className={`font-medium text-sm ${
                                          isSelected
                                            ? 'text-brand-navy-900'
                                            : isUploaded && !isPending
                                            ? 'text-green-800'
                                            : 'text-yellow-900'
                                        }`}
                                      >
                                        {currentLanguage === 'zh'
                                          ? docType.name_zh || docType.name_en
                                          : docType.name_en}
                                      </p>
                                      {docType.description_en ||
                                      docType.description_zh ? (
                                        <p className='text-xs text-gray-500 mt-1'>
                                          {currentLanguage === 'zh'
                                            ? docType.description_zh ||
                                              docType.description_en
                                            : docType.description_en}
                                        </p>
                                      ) : null}
                                      {documentDate && (
                                        <p className='text-xs text-gray-600 mt-1 font-medium'>
                                          {t('applicationStatus.requiredDate')}:{' '}
                                          {formatDate(documentDate)}
                                        </p>
                                      )}
                                      {isUploaded && uploadedDoc && (
                                        <div className='mt-2 flex items-center gap-2 flex-wrap'>
                                          {getStatusBadge(
                                            uploadedDoc.status === 'approved'
                                              ? 'submitted'
                                              : uploadedDoc.status
                                          )}
                                          <span className='text-xs text-yellow-700'>
                                            {t('applicationStatus.uploaded')}{' '}
                                            {formatDate(uploadedDoc.created_at)}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                    <div className='flex items-center gap-2 ml-2'>
                                      {isRejected && (
                                        <XCircle className='w-5 h-5 text-red-600 flex-shrink-0' />
                                      )}
                                      {isUploaded &&
                                        uploadedDoc &&
                                        !isPending &&
                                        !isRejected && (
                                          <CheckCircle className='w-5 h-5 text-green-600 flex-shrink-0' />
                                        )}
                                      {isPending && (
                                        <Clock className='w-5 h-5 text-yellow-600 flex-shrink-0' />
                                      )}
                                      {!isUploaded && (
                                        <>
                                          {isUploadingForThis && (
                                            <Loader2 className='w-5 h-5 text-brand-navy-700 flex-shrink-0 animate-spin' />
                                          )}
                                          {!isUploadingForThis && (
                                            <Upload className='w-5 h-5 text-yellow-600 flex-shrink-0' />
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )
                            }

                            return (
                              <div className='mt-4 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg'>
                                <p className='text-sm text-yellow-900 mb-4'>
                                  {t(
                                    'applicationStatus.requiredDocumentsMessage'
                                  )}
                                </p>

                                {/* Show pending additional uploads */}
                                {hasPendingAdditionalDocs && (
                                  <div className='mb-4'>
                                    <h4 className='text-sm font-semibold text-yellow-900 mb-3'>
                                      {t(
                                        'applicationStatus.pendingAdditionalUploads'
                                      )}
                                      :
                                    </h4>
                                    <div className='space-y-2'>
                                      {pendingAdditionalDocuments.map(doc => {
                                        const docType = allDocumentTypes.find(
                                          dt =>
                                            Number(dt.id) ===
                                              Number(doc.document_id) ||
                                            String(dt.id) ===
                                              String(doc.document_id)
                                        )
                                        if (!docType) return null
                                        return renderUploadableDocument(docType)
                                      })}
                                    </div>
                                  </div>
                                )}

                                {/* Show missing required documents with upload capability */}
                                {hasUnsubmittedAdditionalDocs && (
                                  <div className='mb-4'>
                                    <h4 className='text-sm font-semibold text-yellow-900 mb-3'>
                                      {t('applicationStatus.requiredDocuments')}
                                      :
                                    </h4>
                                    <div className='space-y-2'>
                                      {(() => {
                                        if (allDocumentTypes.length > 0) {
                                          const missingDocs =
                                            allDocumentTypes.filter(doc =>
                                              missingDocumentIds.some(
                                                id =>
                                                  Number(id) ===
                                                    Number(doc.id) ||
                                                  String(id) === String(doc.id)
                                              )
                                            )
                                          if (missingDocs.length > 0) {
                                            return missingDocs.map(doc =>
                                              renderUploadableDocument(doc)
                                            )
                                          }
                                        }
                                        // Fallback: show document IDs if types not loaded
                                        return missingDocumentIds.map(id => (
                                          <div
                                            key={id}
                                            className='p-3 rounded-lg border-2 border-yellow-400 bg-white'
                                          >
                                            <p className='text-sm text-yellow-900'>
                                              Document ID: {id} - {doc.date}
                                            </p>
                                          </div>
                                        ))
                                      })()}
                                    </div>
                                  </div>
                                )}

                                {/* Hidden file input for additional documents */}
                                <input
                                  ref={additionalFileInputRef}
                                  type='file'
                                  accept='.pdf,.jpg,.jpeg,.png,.doc,.docx'
                                  onChange={e =>
                                    handleFileSelect(e, selectedDocumentType)
                                  }
                                  disabled={uploading}
                                  className='hidden'
                                />

                                {uploadError && (
                                  <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
                                    <p className='text-sm text-red-600'>
                                      {uploadError}
                                    </p>
                                  </div>
                                )}
                              </div>
                            )
                          }
                          return null
                        })()}
                      </div>
                    )}

                  <div className='border-t pt-6'>
                    <h3 className='font-semibold text-gray-900 mb-4 text-lg'>
                      {t('applicationStatus.applicantDetails')}
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      {application.id_photo && (
                        <div className='md:col-span-2'>
                          <div className='border border-gray-300 rounded-lg p-4 bg-gray-50'>
                            <label className='block text-sm font-medium text-gray-700 mb-3'>
                              {t('applicationStatus.idPhoto')}
                            </label>
                            <div className='w-32 h-40 border-2 border-gray-300 rounded bg-white flex items-center justify-center overflow-hidden'>
                              <img
                                src={api.getIdPhotoUrl(application.id_photo)}
                                alt='ID photo'
                                className='w-full h-full object-cover'
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      {application.full_name && (
                        <div>
                          <p className='text-sm text-gray-600'>
                            {t('applicationStatus.fullName')}
                          </p>
                          <p className='font-semibold text-gray-900'>
                            {application.full_name}
                          </p>
                        </div>
                      )}
                      {application.surname && (
                        <div>
                          <p className='text-sm text-gray-600'>
                            {t('applicationStatus.surname')}
                          </p>
                          <p className='font-semibold text-gray-900'>
                            {application.surname}
                          </p>
                        </div>
                      )}
                      {application.chinese_name && (
                        <div>
                          <p className='text-sm text-gray-600'>
                            {t('applicationStatus.chineseName')}
                          </p>
                          <p className='font-semibold text-gray-900'>
                            {application.chinese_name}
                          </p>
                        </div>
                      )}
                      {application.ethnic_name && (
                        <div>
                          <p className='text-sm text-gray-600'>
                            {t('applicationStatus.ethnicName')}
                          </p>
                          <p className='font-semibold text-gray-900'>
                            {application.ethnic_name}
                          </p>
                        </div>
                      )}
                      {application.email && (
                        <div>
                          <p className='text-sm text-gray-600'>
                            {t('applicationStatus.email')}
                          </p>
                          <p className='font-semibold text-gray-900'>
                            {application.email}
                          </p>
                        </div>
                      )}
                      {application.phone && (
                        <div>
                          <p className='text-sm text-gray-600'>
                            {t('applicationStatus.phone')}
                          </p>
                          <p className='font-semibold text-gray-900'>
                            {application.phone}
                          </p>
                        </div>
                      )}
                      {application.nric && (
                        <div>
                          <p className='text-sm text-gray-600'>
                            {t('applicationStatus.nric')}
                          </p>
                          <p className='font-semibold text-gray-900'>
                            {application.nric}
                          </p>
                        </div>
                      )}
                      {application.fin && (
                        <div>
                          <p className='text-sm text-gray-600'>
                            {t('applicationStatus.fin')}
                          </p>
                          <p className='font-semibold text-gray-900'>
                            {application.fin}
                          </p>
                        </div>
                      )}
                      {application.date_of_birth && (
                        <div>
                          <p className='text-sm text-gray-600'>
                            {t('applicationStatus.dateOfBirth')}
                          </p>
                          <p className='font-semibold text-gray-900'>
                            {formatDate(application.date_of_birth)}
                          </p>
                        </div>
                      )}
                      {application.nationality_citizenship && (
                        <div>
                          <p className='text-sm text-gray-600'>
                            {t('applicationStatus.nationalityCitizenship')}
                          </p>
                          <p className='font-semibold text-gray-900'>
                            {application.nationality_citizenship}
                          </p>
                        </div>
                      )}
                      {application.occupation && (
                        <div>
                          <p className='text-sm text-gray-600'>
                            {t('applicationStatus.occupation')}
                          </p>
                          <p className='font-semibold text-gray-900'>
                            {application.occupation}
                          </p>
                        </div>
                      )}
                      {application.passport_number && (
                        <div>
                          <p className='text-sm text-gray-600'>
                            {t('applicationStatus.passportNumber')}
                          </p>
                          <p className='font-semibold text-gray-900'>
                            {application.passport_number}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {(application.spouse_full_name ||
                    application.spouse_surname) && (
                    <div className='border-t pt-6'>
                      <h3 className='font-semibold text-gray-900 mb-4 text-lg'>
                        {t('applicationStatus.spouseDetails')}
                      </h3>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {application.spouse_full_name && (
                          <div>
                            <p className='text-sm text-gray-600'>
                              {t('applicationStatus.spouseFullName')}
                            </p>
                            <p className='font-semibold text-gray-900'>
                              {application.spouse_full_name}
                            </p>
                          </div>
                        )}
                        {application.spouse_surname && (
                          <div>
                            <p className='text-sm text-gray-600'>
                              {t('applicationStatus.spouseSurname')}
                            </p>
                            <p className='font-semibold text-gray-900'>
                              {application.spouse_surname}
                            </p>
                          </div>
                        )}
                        {application.spouse_citizenship && (
                          <div>
                            <p className='text-sm text-gray-600'>
                              {t('applicationStatus.spouseCitizenship')}
                            </p>
                            <p className='font-semibold text-gray-900'>
                              {application.spouse_citizenship}
                            </p>
                          </div>
                        )}
                        {application.spouse_occupation && (
                          <div>
                            <p className='text-sm text-gray-600'>
                              {t('applicationStatus.spouseOccupation')}
                            </p>
                            <p className='font-semibold text-gray-900'>
                              {application.spouse_occupation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {application.message && (
                    <div className='border-t pt-6'>
                      <h3 className='font-semibold text-gray-900 mb-4 text-lg'>
                        {t('applicationStatus.additionalMessage')}
                      </h3>
                      <p className='text-gray-700 bg-gray-50 p-4 rounded-lg'>
                        {application.message}
                      </p>
                    </div>
                  )}

                  <div className='border-t pt-6'>
                    <div className='bg-gray-50 p-6 rounded-lg'>
                      <h3 className='font-semibold text-gray-900 mb-2'>
                        {t('applicationStatus.needHelp')}
                      </h3>
                      <p className='text-sm text-gray-600 mb-4'>
                        {t('applicationStatus.helpMessage')}
                      </p>
                      <Link to='/contact'>
                        <Button variant='outline'>
                          {t('applicationStatus.contactSupport')}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value='documents' className='space-y-6'>
                  <h3 className='font-semibold text-gray-900 mb-4 text-lg'>
                    {t('applicationStatus.documents')}
                  </h3>

                  {/* Helper function to render document items */}
                  {(() => {
                    const renderDocumentItem = doc => {
                      const hasCollectionDate = application.collection_date
                        ? true
                        : false
                      const isSelected =
                        selectedDocumentType === doc.id.toString()
                      const uploadedDoc = application.documents?.find(
                        ad => ad.document_id === doc.id
                      )
                      const isUploaded = !!uploadedDoc
                      const isPending =
                        uploadedDoc &&
                        (uploadedDoc.status === 'pending' ||
                          uploadedDoc.status === 'in_review' ||
                          uploadedDoc.status === 'in review')
                      const isRejected =
                        uploadedDoc && uploadedDoc.status === 'rejected'
                      const isUploadingForThis = uploading && isSelected

                      // Check if this is an additional document and get its date
                      const isAdditionalDoc =
                        application.additional_documents?.includes(doc.id) ||
                        false
                      const documentDate =
                        isAdditionalDoc &&
                        application.additional_document_dates?.[doc.id]
                          ? application.additional_document_dates[doc.id]
                          : null

                      return (
                        <div
                          key={doc.id}
                          onClick={() => {
                            if (
                              !uploading &&
                              (!isUploaded || isPending || isRejected)
                            ) {
                              handleDocumentClick(
                                doc.id,
                                isUploaded && !isPending && !isRejected,
                                fileInputRef
                              )
                            }
                          }}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            isSelected
                              ? 'border-brand-navy-600 bg-brand-navy-50'
                              : isRejected
                              ? 'border-red-400 bg-red-50 hover:border-red-500 hover:bg-red-100'
                              : isUploaded && !isPending
                              ? 'border-green-300 bg-green-50 cursor-not-allowed opacity-75'
                              : 'border-gray-300 bg-white hover:border-brand-navy-300 hover:bg-brand-navy-50'
                          } ${
                            uploading ||
                            (isUploaded && !isPending && !isRejected)
                              ? 'cursor-not-allowed'
                              : ''
                          }`}
                        >
                          <div className='flex items-center justify-between'>
                            <div className='flex-1'>
                              <p
                                className={`font-medium ${
                                  isSelected
                                    ? 'text-brand-navy-900'
                                    : isRejected
                                    ? 'text-red-900'
                                    : isUploaded && !isPending
                                    ? 'text-green-800'
                                    : 'text-gray-900'
                                }`}
                              >
                                {currentLanguage === 'zh'
                                  ? doc.name_zh || doc.name_en
                                  : doc.name_en}
                              </p>
                              {doc.description_en || doc.description_zh ? (
                                <p className='text-xs text-gray-500 mt-1'>
                                  {currentLanguage === 'zh'
                                    ? doc.description_zh || doc.description_en
                                    : doc.description_en}
                                </p>
                              ) : null}
                              {documentDate && (
                                <p className='text-xs text-gray-600 mt-1 font-medium'>
                                  {t('applicationStatus.requiredDate')}:{' '}
                                  {formatDate(documentDate)}
                                </p>
                              )}
                              {isUploaded && uploadedDoc && (
                                <div className='mt-2 flex items-center gap-2 flex-wrap'>
                                  {getStatusBadge(
                                    uploadedDoc.status === 'approved'
                                      ? 'submitted'
                                      : uploadedDoc.status
                                  )}
                                  <span className='text-xs text-gray-500'>
                                    {t('applicationStatus.uploaded')}{' '}
                                    {formatDate(uploadedDoc.created_at)}
                                  </span>
                                  {uploadedDoc.original_name && (
                                    <span className='text-xs text-gray-400'>
                                      • {uploadedDoc.original_name}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className='flex items-center gap-2 ml-2'>
                              {isRejected && (
                                <XCircle className='w-5 h-5 text-red-600 flex-shrink-0' />
                              )}
                              {isUploaded &&
                                uploadedDoc &&
                                !isPending &&
                                !isRejected && (
                                  <CheckCircle className='w-5 h-5 text-green-600 flex-shrink-0' />
                                )}
                              {isPending && (
                                <Clock className='w-5 h-5 text-yellow-600 flex-shrink-0' />
                              )}
                              {isUploaded && uploadedDoc && (
                                <>
                                  <Button
                                    variant='outline'
                                    size='sm'
                                    onClick={e => {
                                      e.stopPropagation()
                                      const previewUrl =
                                        api.getDocumentPreviewUrl(
                                          code,
                                          uploadedDoc.id
                                        )
                                      window.open(previewUrl, '_blank')
                                    }}
                                    className='h-8 px-3 text-xs'
                                  >
                                    <Eye className='w-3 h-3 mr-1' />
                                    {t('applicationStatus.preview')}
                                  </Button>
                                  {isRejected && (
                                    <Button
                                      variant='outline'
                                      size='sm'
                                      onClick={e => {
                                        e.stopPropagation()
                                        handleDocumentClick(
                                          doc.id,
                                          false,
                                          fileInputRef
                                        )
                                      }}
                                      disabled={uploading}
                                      className='h-8 px-3 text-xs'
                                    >
                                      <Upload className='w-3 h-3 mr-1' />
                                      {t('applicationStatus.reupload')}
                                    </Button>
                                  )}
                                </>
                              )}
                              {!isUploaded && (
                                <>
                                  {isUploadingForThis && (
                                    <Loader2 className='w-5 h-5 text-brand-navy-700 flex-shrink-0 animate-spin' />
                                  )}
                                  {!isUploadingForThis && (
                                    <Upload className='w-5 h-5 text-gray-400 flex-shrink-0' />
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    }

                    // Helper function to render documents grouped by category
                    const renderGroupedDocuments = (
                      groupedDocs,
                      isAdditional = false
                    ) => {
                      if (!groupedDocs || typeof groupedDocs !== 'object')
                        return null

                      // Check if it's an array (backward compatibility) or grouped object
                      const isGrouped = !Array.isArray(groupedDocs)

                      if (!isGrouped) {
                        // Backward compatibility: render as flat list
                        return (
                          <div
                            className={`mb-6 p-4 border-2 border-dashed ${
                              isAdditional
                                ? 'border-brand-navy-300 rounded-lg bg-brand-navy-50'
                                : 'border-gray-300 rounded-lg bg-gray-50'
                            }`}
                          >
                            <h4
                              className={`text-sm font-semibold mb-4 ${
                                isAdditional ? 'text-brand-navy-900' : 'text-gray-700'
                              }`}
                            >
                              {isAdditional
                                ? t('applicationStatus.additionalDocuments')
                                : t('applicationStatus.requiredDocuments')}
                            </h4>
                            <div className='space-y-2'>
                              {groupedDocs.map(doc => renderDocumentItem(doc))}
                            </div>
                          </div>
                        )
                      }

                      // Render grouped by category
                      const categories = Object.keys(groupedDocs)
                      if (categories.length === 0) return null

                      return (
                        <div
                          className={`mb-6 p-4 border-2 border-dashed ${
                            isAdditional
                              ? 'border-brand-navy-300 rounded-lg bg-brand-navy-50'
                              : 'border-gray-300 rounded-lg bg-gray-50'
                          }`}
                        >
                          <h4
                            className={`text-sm font-semibold mb-4 ${
                              isAdditional ? 'text-brand-navy-900' : 'text-gray-700'
                            }`}
                          >
                            {isAdditional
                              ? t('applicationStatus.additionalDocuments')
                              : t('applicationStatus.requiredDocuments')}
                          </h4>
                          <div className='space-y-6'>
                            {categories.map(category => {
                              const categoryName =
                                currentLanguage === 'zh'
                                  ? groupedDocs[category][0]?.category_zh ||
                                    category
                                  : category
                              return (
                                <div key={category} className='space-y-2'>
                                  <h5 className='text-sm font-semibold text-gray-800 mb-2'>
                                    {categoryName}
                                  </h5>
                                  <div className='space-y-2'>
                                    {groupedDocs[category].map(doc =>
                                      renderDocumentItem(doc)
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    }

                    return (
                      <div className='space-y-6'>
                        {/* Additional Documents Section */}
                        {renderGroupedDocuments(additionalDocumentTypes, true)}

                        {/* Normal Documents Section */}
                        {renderGroupedDocuments(documentTypes, false)}

                        {/* Hidden file input */}
                        <input
                          ref={fileInputRef}
                          type='file'
                          accept='.pdf,.jpg,.jpeg,.png,.doc,.docx'
                          onChange={e =>
                            handleFileSelect(e, selectedDocumentType)
                          }
                          disabled={uploading}
                          className='hidden'
                        />

                        {uploadError && (
                          <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
                            <p className='text-sm text-red-600'>
                              {uploadError}
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })()}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
