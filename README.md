
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

---

## Data Models

### ShortenedUrl Interface
```typescript
interface ShortenedUrl {
  id: string;          // Unique identifier
  originalUrl: string; // Original long URL
  shortUrl: string;    // Complete shortened URL
  shortCode: string;   // 6-character code only
  createdAt: Date;     // Creation timestamp
  clicks: number;      // Click counter (future feature)
}
```

**Example**:
```json
{
  "id": "1a2b3c4d5e6f",
  "originalUrl": "https://example.com/very/long/path",
  "shortUrl": "https://short.ly/aB3xY9",
  "shortCode": "aB3xY9",
  "createdAt": "2025-01-10T15:30:00.000Z",
  "clicks": 0
}
```

---

## API Reference

### UrlShortenerService API

#### Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `shortenUrl()` | `originalUrl: string` | `ShortenedUrl` | Creates shortened URL |
| `validateUrl()` | `url: string` | `boolean` | Validates URL format |
| `normalizeUrl()` | `url: string` | `string` | Adds protocol if missing |

#### Observables

| Observable | Type | Description |
|------------|------|-------------|
| `urls$` | `Observable<ShortenedUrl[]>` | Stream of shortened URLs |

### Component Events

#### UrlFormComponent

| Event | Payload | Description |
|-------|---------|-------------|
| `urlShortened` | `void` | Emitted when URL is successfully shortened |

---

## Deployment

### Build Process
```bash
# Production build
ng build --configuration=production

# Output directory
dist/demo/browser/
```

### Build Configuration
- **Target**: ES2022
- **Bundler**: esbuild
- **Output Hashing**: Enabled for production
- **Source Maps**: Disabled for production
- **Optimization**: Enabled for production

### Deployment Platforms

#### Netlify (Recommended)
1. Build command: `ng build`
2. Publish directory: `dist/demo/browser`
3. Node version: 18+

#### Static Hosting
The application is a Single Page Application (SPA) that can be deployed to any static hosting service:
- GitHub Pages
- Vercel
- AWS S3
- Firebase Hosting

### Environment Configuration
No environment-specific configuration required. All functionality is client-side.

---

## Testing

### Unit Testing Setup
```bash
# Install testing dependencies
npm install --save-dev @angular/testing jasmine karma

# Run tests
ng test
```

### Test Coverage Areas
- URL validation logic
- Short code generation
- Component interactions
- Service methods
- Error handling

### Example Test Cases
```typescript
describe('UrlShortenerService', () => {
  it('should validate correct URLs', () => {
    expect(service.validateUrl('https://example.com')).toBe(true);
  });

  it('should generate 6-character short codes', () => {
    const code = service.generateShortCode();
    expect(code.length).toBe(6);
  });
});
```

---

## Troubleshooting

### Common Issues

#### 1. URLs Not Persisting
**Problem**: Shortened URLs disappear on page refresh
**Solution**: Check browser localStorage permissions and quota

#### 2. Copy to Clipboard Not Working
**Problem**: Copy button doesn't work
**Causes**:
- HTTPS required for clipboard API
- Browser permissions
**Solution**: Ensure HTTPS in production, check browser console

#### 3. URL Validation Failing
**Problem**: Valid URLs marked as invalid
**Debug Steps**:
1. Check URL format
2. Verify protocol (http/https only)
3. Test with URL constructor

#### 4. Build Errors
**Problem**: Production build fails
**Common Causes**:
- TypeScript strict mode violations
- Missing dependencies
**Solution**: Check TypeScript configuration and dependencies

### Browser Compatibility
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Performance Considerations
- localStorage has ~5-10MB limit
- Large URL lists may impact performance
- Consider pagination for 1000+ URLs

### Security Notes
- All data stored locally (no server transmission)
- No authentication required
- URLs are not actually functional (demo purposes)
- Consider URL sanitization for production use

---

## Future Enhancements

### Planned Features
1. **Analytics Dashboard**
   - Click tracking
   - Geographic data
   - Time-based analytics

2. **Custom Short Codes**
   - User-defined short codes
   - Vanity URLs

3. **Bulk Operations**
   - Import/export URLs
   - Batch shortening

4. **Advanced Features**
   - QR code generation
   - Expiration dates
   - Password protection

### Technical Improvements
1. **Backend Integration**
   - Real URL redirection
   - Database storage
   - User accounts

2. **Performance**
   - Virtual scrolling for large lists
   - Lazy loading
   - Caching strategies

3. **Testing**
   - E2E test suite
   - Performance testing
   - Accessibility testing

---

## Appendix

### File Structure Details
```
angular-url-shortener/
├── src/
│   ├── components/
│   │   ├── url-form/
│   │   │   └── url-form.component.ts    # URL input form
│   │   └── url-list/
│   │       └── url-list.component.ts    # URL display list
│   ├── services/
│   │   └── url-shortener.service.ts     # Core business logic
│   ├── global_styles.css                # Application styles
│   ├── index.html                       # HTML template
│   └── main.ts                          # Application bootstrap
├── angular.json                         # Angular CLI configuration
├── package.json                         # Dependencies and scripts
├── tsconfig.json                        # TypeScript configuration
└── tsconfig.app.json                    # App-specific TS config
```

### Dependencies
```json
{
  "dependencies": {
    "@angular/animations": "^20.0.0",
    "@angular/common": "^20.0.0",
    "@angular/compiler": "^20.0.0",
    "@angular/core": "^20.0.0",
    "@angular/forms": "^20.0.0",
    "@angular/platform-browser": "^20.0.0",
    "@angular/router": "^20.0.0",
    "rxjs": "^7.8.1",
    "tslib": "^2.5.0",
    "zone.js": "~0.15.0"
  }
}
```

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
