
<img width="915" height="541" alt="image" src="https://github.com/user-attachments/assets/39ebcfc0-c114-4ef6-be2a-ec0df410e86a" />


deployed on https://url-shortener-angular-aj.netlify.app/
### Description
A client-side URL shortener application built with Angular 20 that allows users to create shortened versions of long URLs. The application provides a clean interface for URL input, validation, shortening, and management.

### Key Features
- URL validation and normalization
- Random short code generation
- Local storage persistence
- Copy-to-clipboard functionality
- Responsive design
- Real-time URL history
- Click tracking (client-side)

### Technology Stack
- **Framework**: Angular 20
- **Language**: TypeScript 5.8.2
- **Styling**: CSS3
- **State Management**: RxJS BehaviorSubject
- **Storage**: Browser localStorage
- **Build Tool**: Angular CLI with esbuild



## Component Documentation

### UrlFormComponent

**Purpose**: Handles URL input, validation, and submission

**Selector**: `app-url-form`

**Properties**:
```typescript
urlInput: string = '';           // User input
showError: boolean = false;      // Error state flag
errorMessage: string = '';       // Error message text
isProcessing: boolean = false;   // Loading state
```

**Events**:
```typescript
@Output() urlShortened = new EventEmitter<void>();
```

**Methods**:
```typescript
shortenUrl(): void
// Validates input and triggers URL shortening process
// Emits urlShortened event on success
```

**Template Features**:
- Input field with error styling
- Real-time validation feedback
- Enter key support
- Loading state indication

### UrlListComponent

**Purpose**: Displays shortened URLs with management features

**Selector**: `app-url-list`

**Properties**:
```typescript
urls: ShortenedUrl[] = [];       // List of shortened URLs
copiedId: string | null = null;  // Currently copied URL ID
```

**Methods**:
```typescript
copyToClipboard(text: string): void
// Copies URL to clipboard using Navigator API
// Shows temporary "Copied!" feedback

formatDate(date: Date): string
// Formats creation date to relative time
// Returns: "just now", "5m ago", "2h ago", "3d ago"
```

**Template Features**:
- Responsive URL cards
- Copy-to-clipboard buttons
- Relative timestamp display
- Empty state handling

### App Component (Root)

**Purpose**: Main application container and orchestration

**Properties**:
```typescript
showSuccess: boolean = false;    // Success message state
```

**Methods**:
```typescript
onUrlShortened(): void
// Handles successful URL shortening
// Shows temporary success message
```

---

## Service Documentation

### UrlShortenerService

**Purpose**: Core business logic for URL shortening operations

**Injectable**: `{ providedIn: 'root' }`

#### Properties
```typescript
private baseUrl: string = 'https://short.ly/';
private urlsSubject: BehaviorSubject<ShortenedUrl[]>;
public urls$: Observable<ShortenedUrl[]>;
```

#### Public Methods

##### `shortenUrl(originalUrl: string): ShortenedUrl`
Creates a shortened version of the provided URL.

**Parameters**:
- `originalUrl`: The URL to be shortened

**Returns**: `ShortenedUrl` object with generated short code

**Process**:
1. Generate unique 6-character short code
2. Create short URL with base domain
3. Generate unique ID for tracking
4. Create ShortenedUrl object
5. Update state and persist to localStorage

##### `validateUrl(url: string): boolean`
Validates URL format and protocol.

**Parameters**:
- `url`: URL string to validate

**Returns**: `boolean` - true if valid, false otherwise

**Validation Rules**:
- Must be valid URL format
- Supports http/https protocols only
- Auto-adds https:// if missing

##### `normalizeUrl(url: string): string`
Normalizes URL by adding protocol if missing.

**Parameters**:
- `url`: URL string to normalize

**Returns**: Normalized URL string

#### Private Methods

##### `generateShortCode(): string`
Generates random 6-character alphanumeric code.

**Character Set**: A-Z, a-z, 0-9 (62 characters)
**Length**: 6 characters
**Possible Combinations**: 62^6 = ~56 billion

##### `generateId(): string`
Creates unique identifier for URL records.

**Format**: timestamp + random string
**Example**: "1a2b3c4d5e6f"

##### `saveUrls(urls: ShortenedUrl[]): void`
Persists URL array to localStorage.

##### `loadUrls(): void`
Loads URLs from localStorage on service initialization.





### Configuration Files

#### angular.json Key Settings
- **Build Target**: ES2022
- **Bundle Budgets**: Optimized for performance
- **Source Maps**: Environment-dependent
- **Styles**: Global CSS included

#### TypeScript Configuration
- **Strict Mode**: Enabled
- **Experimental Decorators**: Enabled
- **Module Resolution**: Bundler
- **Target**: ES2022
