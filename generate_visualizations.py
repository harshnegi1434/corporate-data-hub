import matplotlib.pyplot as plt
import seaborn as sns
from wordcloud import WordCloud
import pandas as pd

df = pd.read_csv("company_data_processed.csv")

# Visualization 1: Number of Companies by Salary Range (Matplotlib)
salary_bins = [0, 4, 6, 8, 10, 15, 20, 30, float('inf')]
salary_labels = ['0-4', '4-6', '6-8', '8-10', '10-15', '15-20', '20-30', '30+']
df['Salary Range'] = pd.cut(df['Salary'], bins=salary_bins, labels=salary_labels, right=False)
salary_range_counts = df['Salary Range'].value_counts().sort_index()
plt.figure(figsize=(10, 6))
salary_range_counts.plot(kind='bar', color='skyblue')
plt.title('Number of Companies by Salary Range')
plt.xlabel('Salary Range (LPA)')
plt.ylabel('Number of Companies')
plt.xticks(rotation=45)
plt.grid(axis='y', linestyle='--', alpha=0.7)
plt.tight_layout()
# Save the visualization as an image
plt.savefig('static/salary_range_counts.png')

# Visualization 2: Distribution of Companies by Rating (Matplotlib)
rating_counts = df['Rating'].value_counts().sort_index()
plt.figure(figsize=(10, 5))
plt.bar(rating_counts.index, rating_counts.values, color='blue')
plt.xlabel('Rating')
plt.ylabel('Count of Companies')
plt.title('Distribution of Companies by Rating')
# Save the visualization as an image
plt.savefig('static/rating_counts.png')

# Visualization 3: Word Cloud (WordCloud)
text = ' '.join(df['Company Name'])
wordcloud = WordCloud(width=800, height=400, background_color='white').generate(text)
plt.figure(figsize=(10, 5))
plt.imshow(wordcloud, interpolation='bilinear')
plt.axis('off')
# Save the visualization as an image
plt.savefig('static/wordcloud.png')

# Visualization 4: Summary Statistics of Salaries (sns)
plt.figure(figsize=(8, 6))
sns.boxplot(x='Salary', data=df)
plt.title('Summary Statistics of Salaries')
# Save the visualization as an image
plt.savefig('static/summary_sns.png')


# Visualization 5: Proportion of Each Designation Category (matplotlib)
designation_counts = df['Designation'].value_counts()
plt.figure(figsize=(8, 8))
plt.pie(designation_counts, labels=designation_counts.index, autopct='%1.1f%%', startangle=140)
plt.title('Proportion of Each Designation Category')
# Save the visualization as an image
plt.savefig('static/proportion.png')


# Visualization 6: Relationship between Salary and Rating (matplotlib)
plt.scatter(df['Salary'], df['Rating'], color='green', alpha=0.5)
plt.xlabel('Salary')
plt.ylabel('Rating')
plt.title('Relationship between Salary and Rating')
# Save the visualization as an image
plt.savefig('static/relantionship.png')

# Visualization 7: Correlation Matrix (sns)
corr_matrix = df[['Salary', 'Rating', 'Reported Salaries']].corr()
plt.figure(figsize=(8, 6))
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', fmt='.2f')
plt.title('Correlation Matrix')
plt.show()
# Save the visualization as an image
plt.savefig('static/correlation_matrix.png')

print("Exporting Done")