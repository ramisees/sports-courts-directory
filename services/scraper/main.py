import os
import time
import schedule
import requests
from typing import List, Dict
import json

class SportsCourtScraper:
    def __init__(self):
        self.firecrawl_api_key = os.getenv("FIRECRAWL_API_KEY")
        self.google_maps_api_key = os.getenv("GOOGLE_MAPS_API_KEY")
        
        # Sports we're targeting
        self.sports_types = [
            "basketball",
            "tennis", 
            "pickleball",
            "volleyball",
            "racquetball",
            "squash",
            "badminton",
            "handball",
            "soccer",
            "futsal",
            "hockey",
            "roller hockey",
            "skateboarding",
            "bmx"
        ]
        
    def scrape_sports_facilities(self, city: str, state: str, sport: str) -> List[Dict]:
        """Scrape sports courts/facilities from various sources"""
        print(f"Scraping {sport} courts in {city}, {state}")
        
        # Target sources for sports courts:
        sources = [
            f"{sport} courts {city} {state}",
            f"{sport} facilities {city} {state}", 
            f"public {sport} courts {city}",
            f"{sport} recreation center {city}",
            f"{sport} park {city}",
            f"community {sport} courts {city}"
        ]
        
        courts_found = []
        
        for source in sources:
            print(f"  Searching: {source}")
            # Placeholder for actual scraping logic
            # This will be implemented with Firecrawl and Google Maps APIs
            
        return courts_found
    
    def scrape_municipal_sports_facilities(self, city: str, state: str) -> List[Dict]:
        """Scrape from city/municipal recreation websites"""
        print(f"Scraping municipal sports facilities for {city}, {state}")
        
        # Common municipal website patterns for sports facilities
        municipal_urls = [
            f"https://www.{city.lower().replace(' ', '')}{state.lower()}.gov/recreation",
            f"https://www.{city.lower().replace(' ', '')}.gov/parks-recreation", 
            f"https://{city.lower().replace(' ', '')}.gov/facilities",
            f"https://www.{city.lower().replace(' ', '')}.org/recreation"
        ]
        
        all_courts = []
        
        for url in municipal_urls:
            print(f"  Checking: {url}")
            # Will implement with Firecrawl API
            
        return all_courts
    
    def scrape_google_maps_sports_courts(self, location: str, sport_type: str) -> List[Dict]:
        """Scrape sports courts from Google Maps"""
        print(f"Scraping Google Maps for {sport_type} courts in {location}")
        
        # Google Maps search queries for sports courts
        search_queries = [
            f"{sport_type} court near {location}",
            f"{sport_type} facility {location}",
            f"public {sport_type} court {location}",
            f"{sport_type} recreation center {location}"
        ]
        
        courts_found = []
        
        for query in search_queries:
            print(f"  Google Maps query: {query}")
            # Will implement with Google Maps Places API
            
        return courts_found
    
    def validate_sports_court_data(self, court_data: Dict) -> bool:
        """Validate that this is actually a sports court"""
        
        # Keywords that indicate it's a sports facility
        sports_keywords = [
            "court", "courts", "gym", "gymnasium", "recreation", "rec center",
            "sports complex", "athletic center", "tennis", "basketball", 
            "pickleball", "volleyball", "racquetball", "squash", "badminton"
        ]
        
        # Keywords that indicate it's NOT what we want (avoid judicial courts)
        exclude_keywords = [
            "courthouse", "court house", "judicial", "supreme court", 
            "district court", "family court", "criminal court", "civil court",
            "magistrate", "federal court", "appeals court", "traffic court"
        ]
        
        name = court_data.get('name', '').lower()
        description = court_data.get('description', '').lower()
        text_to_check = f"{name} {description}"
        
        # Exclude judicial/legal courts
        for exclude_word in exclude_keywords:
            if exclude_word in text_to_check:
                print(f"  EXCLUDED: {court_data.get('name')} (contains '{exclude_word}')")
                return False
        
        # Must contain sports-related keywords
        for sports_word in sports_keywords:
            if sports_word in text_to_check:
                print(f"  VALIDATED: {court_data.get('name')} (contains '{sports_word}')")
                return True
                
        print(f"  SKIPPED: {court_data.get('name')} (no sports keywords found)")
        return False
    
    def save_courts_to_database(self, courts: List[Dict]):
        """Save validated sports courts to database"""
        validated_courts = [court for court in courts if self.validate_sports_court_data(court)]
        print(f"Saving {len(validated_courts)} validated sports courts to database")
        # Database implementation will go here
        pass

def run_daily_sports_court_scraping():
    """Run daily scraping for sports courts"""
    scraper = SportsCourtScraper()
    
    # Major cities to scrape for sports facilities
    target_cities = [
        ("New York", "NY"),
        ("Los Angeles", "CA"), 
        ("Chicago", "IL"),
        ("Houston", "TX"),
        ("Phoenix", "AZ"),
        ("Philadelphia", "PA"),
        ("San Antonio", "TX"),
        ("San Diego", "CA"),
        ("Dallas", "TX"),
        ("Austin", "TX"),
        ("Miami", "FL"),
        ("Atlanta", "GA"),
        ("Boston", "MA"),
        ("Seattle", "WA"),
        ("Denver", "CO")
    ]
    
    for city, state in target_cities:
        print(f"\n=== Scraping sports courts in {city}, {state} ===")
        
        # Scrape each sport type
        for sport in scraper.sports_types:
            courts = scraper.scrape_sports_facilities(city, state, sport)
            scraper.save_courts_to_database(courts)
            time.sleep(1)  # Rate limiting
        
        # Also check municipal websites
        municipal_courts = scraper.scrape_municipal_sports_facilities(city, state)
        scraper.save_courts_to_database(municipal_courts)
        
        time.sleep(5)  # Longer pause between cities

if __name__ == "__main__":
    print("🏀 Sports Courts Scraper Service Started")
    print("Targeting: Basketball, Tennis, Pickleball, Volleyball, Racquetball, and more!")
    print("Excluding: Judicial courts, courthouses, legal facilities")
    
    # Schedule daily scraping at 2 AM
    schedule.every().day.at("02:00").do(run_daily_sports_court_scraping)
    
    # For testing, run a small scrape immediately
    scraper = SportsCourtScraper()
    print("\n🔍 Running test scrape...")
    test_courts = scraper.scrape_sports_facilities("Austin", "TX", "basketball")
    
    # Keep the service running
    while True:
        schedule.run_pending()
        time.sleep(3600)  # Check every hour
